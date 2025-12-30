// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .step, .testimonial-card, .auth-feature');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                if (number && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat, number);
                }
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});

// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const earlyAccessForm = document.querySelector('.early-access-form');
    
    if (earlyAccessForm) {
        earlyAccessForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate form submission
                const button = this.querySelector('button');
                const originalText = button.textContent;
                
                button.textContent = 'Submitting...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = 'Success!';
                    button.style.background = '#10b981';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        button.style.background = '';
                        this.querySelector('input[type="email"]').value = '';
                    }, 2000);
                }, 1000);
            }
        });
    }
});

// Download Button Interactions
document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.btn-primary');
    
    downloadButtons.forEach(button => {
        if (button.textContent.includes('Download')) {
            button.addEventListener('click', function() {
                // Simulate download action
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-check"></i> Ready to Download';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                }, 1500);
            });
        }
    });
});

// Parallax Effect for Hero Background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroPattern = document.querySelector('.hero-bg-pattern');
    
    if (heroPattern) {
        heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Phone Mockup Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    const sosButton = document.querySelector('.sos-btn');
    
    if (sosButton) {
        sosButton.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    }
});

// Floating Elements Animation Control
document.addEventListener('DOMContentLoaded', function() {
    const floatingElements = document.querySelectorAll('.floating-icon');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
});

// Dashboard Stats Animation
const dashboardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach((stat, index) => {
                setTimeout(() => {
                    stat.style.transform = 'scale(1.1)';
                    stat.style.color = '#6366f1';
                    
                    setTimeout(() => {
                        stat.style.transform = 'scale(1)';
                    }, 300);
                }, index * 200);
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const dashboardStats = document.querySelector('.dashboard-stats');
    if (dashboardStats) {
        dashboardObserver.observe(dashboardStats);
    }
});

// Add loading states to CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-btn, .btn-primary, .btn-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Testimonial Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderLeft = '4px solid #6366f1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderLeft = 'none';
        });
    });
});

// Feature Card Interaction
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 100);
        });
    });
});

// Smooth reveal animation for sections
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        revealObserver.observe(section);
    });
    
    // Add CSS for revealed state
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
// Interactive Feature Demos
document.addEventListener('DOMContentLoaded', function() {
    initializeFeatureDemos();
});

function initializeFeatureDemos() {
    // Demo button handlers
    document.querySelectorAll('.demo-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.feature-card');
            const feature = card.dataset.feature;
            const demoContent = card.querySelector('.demo-content');
            
            // Toggle demo visibility
            if (demoContent.classList.contains('active')) {
                demoContent.classList.remove('active');
                this.textContent = this.textContent.replace('Hide', 'Try').replace('Stop', 'Try');
            } else {
                // Hide other active demos
                document.querySelectorAll('.demo-content.active').forEach(demo => {
                    demo.classList.remove('active');
                });
                document.querySelectorAll('.demo-btn').forEach(b => {
                    b.textContent = b.textContent.replace('Hide', 'Try').replace('Stop', 'Try');
                });
                
                demoContent.classList.add('active');
                this.textContent = this.textContent.replace('Try', 'Hide').replace('Test', 'Stop').replace('Run', 'Stop').replace('Get', 'Hide').replace('Join', 'Hide');
                
                // Initialize specific demo
                initializeDemo(feature);
            }
        });
    });
}

function initializeDemo(feature) {
    switch(feature) {
        case 'location':
            startLocationDemo();
            break;
        case 'geofence':
            startGeofenceDemo();
            break;
        case 'sos':
            startSOSDemo();
            break;
        case 'ai':
            startAIDemo();
            break;
        case 'routing':
            startRoutingDemo();
            break;
        case 'community':
            startCommunityDemo();
            break;
    }
}

// Location Tracking Demo
function startLocationDemo() {
    const coordsElement = document.getElementById('coords');
    const statusElement = document.getElementById('location-status');
    
    // Simulate getting location
    coordsElement.textContent = 'Requesting location...';
    statusElement.textContent = 'Initializing GPS...';
    
    setTimeout(() => {
        if (navigator.geolocation) {
            const options = {
                enableHighAccuracy: true,
                timeout: 10000, // 10 second timeout
                maximumAge: 60000 // Cache for 1 minute
            };
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(6);
                    const lng = position.coords.longitude.toFixed(6);
                    coordsElement.textContent = `${lat}, ${lng}`;
                    statusElement.textContent = 'Location Acquired - Tracking Active';
                },
                (error) => {
                    // Handle different types of errors
                    if (error.code === error.TIMEOUT) {
                        coordsElement.textContent = 'Location request timed out';
                        statusElement.textContent = 'GPS Timeout - Using Demo Mode';
                        setTimeout(() => {
                            coordsElement.textContent = '40.7128, -74.0060 (Demo)';
                            statusElement.textContent = 'Demo Mode - Simulated Location';
                        }, 2000);
                    } else if (error.code === error.PERMISSION_DENIED) {
                        coordsElement.textContent = 'Location access denied';
                        statusElement.textContent = 'Permission Required';
                        setTimeout(() => {
                            coordsElement.textContent = '40.7128, -74.0060 (Demo)';
                            statusElement.textContent = 'Demo Mode - Enable Location for Real Data';
                        }, 2000);
                    } else {
                        // Fallback to simulated coordinates
                        coordsElement.textContent = '40.7128, -74.0060 (Demo)';
                        statusElement.textContent = 'Demo Mode - Location Unavailable';
                    }
                },
                options
            );
        } else {
            coordsElement.textContent = '40.7128, -74.0060 (Demo)';
            statusElement.textContent = 'Demo Mode - Geolocation Not Supported';
        }
    }, 1000);
}

// Geofence Demo
function startGeofenceDemo() {
    const zoneButtons = document.querySelectorAll('.zone-btn');
    const alertDisplay = document.getElementById('alert-display');
    
    zoneButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const zone = this.dataset.zone;
            updateGeofenceAlert(zone, alertDisplay);
        });
    });
    
    // Set initial safe zone
    updateGeofenceAlert('safe', alertDisplay);
}

function updateGeofenceAlert(zone, alertDisplay) {
    alertDisplay.className = 'alert-display ' + zone;
    
    const alerts = {
        safe: {
            icon: 'fas fa-shield-check',
            text: 'You are in a Safe Zone'
        },
        warning: {
            icon: 'fas fa-exclamation-triangle',
            text: 'Caution: Approaching Risk Area'
        },
        danger: {
            icon: 'fas fa-times-circle',
            text: 'ALERT: High Risk Zone Detected!'
        }
    };
    
    const alert = alerts[zone];
    alertDisplay.innerHTML = `<i class="${alert.icon}"></i><span>${alert.text}</span>`;
    
    // Play sound effect simulation
    if (zone === 'danger') {
        // Simulate alert sound
        console.log('🚨 DANGER ALERT TRIGGERED');
    }
}

// SOS Demo
function startSOSDemo() {
    const sosButton = document.getElementById('sos-trigger');
    const sosStatus = document.getElementById('sos-status');
    
    sosButton.addEventListener('click', function() {
        triggerSOSAlert(sosStatus);
    });
}

function triggerSOSAlert(statusElement) {
    const sosButton = document.getElementById('sos-trigger');
    
    // Activate SOS state
    sosButton.classList.add('active');
    statusElement.classList.add('emergency');
    statusElement.innerHTML = `
        <div style="text-align: center;">
            <h4 style="color: #ef4444; margin-bottom: 0.5rem;">🚨 EMERGENCY ALERT SENT</h4>
            <p><strong>Authorities Notified:</strong> Local Police, Emergency Services</p>
            <p><strong>Contacts Alerted:</strong> 3 Emergency Contacts</p>
            <p><strong>Location Shared:</strong> Real-time GPS coordinates</p>
            <p><strong>Response Time:</strong> 3-5 minutes</p>
            <div style="margin-top: 1rem; padding: 0.5rem; background: rgba(239, 68, 68, 0.1); border-radius: 8px;">
                <small>This is a demo - No actual emergency services were contacted</small>
            </div>
        </div>
    `;
    
    // Reset after 5 seconds
    setTimeout(() => {
        sosButton.classList.remove('active');
        statusElement.classList.remove('emergency');
        statusElement.innerHTML = '<p>Press the SOS button to simulate emergency alert</p>';
    }, 5000);
}

// AI Analysis Demo
function startAIDemo() {
    const progressBar = document.getElementById('ai-progress');
    const crowdLevel = document.getElementById('crowd-level');
    const timeRisk = document.getElementById('time-risk');
    const areaSafety = document.getElementById('area-safety');
    
    // Simulate AI analysis
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            showAIResults(crowdLevel, timeRisk, areaSafety);
        }
    }, 200);
}

function showAIResults(crowdLevel, timeRisk, areaSafety) {
    // Simulate realistic AI analysis results
    const currentHour = new Date().getHours();
    const isNight = currentHour < 6 || currentHour > 22;
    
    setTimeout(() => {
        crowdLevel.textContent = 'Moderate (45 people/km²)';
        crowdLevel.style.color = '#f59e0b';
    }, 500);
    
    setTimeout(() => {
        timeRisk.textContent = isNight ? 'High (Night Hours)' : 'Low (Daylight)';
        timeRisk.style.color = isNight ? '#ef4444' : '#10b981';
    }, 1000);
    
    setTimeout(() => {
        areaSafety.textContent = 'Safe (Well-lit, Police Patrol)';
        areaSafety.style.color = '#10b981';
    }, 1500);
}

// Route Planning Demo
function startRoutingDemo() {
    const destinationInput = document.getElementById('destination-input');
    const findRouteBtn = document.getElementById('find-route');
    const routeResults = document.getElementById('route-results');
    
    findRouteBtn.addEventListener('click', function() {
        const destination = destinationInput.value.trim();
        if (destination) {
            findSafeRoute(destination, routeResults);
        } else {
            destinationInput.placeholder = 'Please enter a destination';
            destinationInput.style.borderColor = '#ef4444';
            setTimeout(() => {
                destinationInput.placeholder = 'To: Enter destination';
                destinationInput.style.borderColor = '';
            }, 2000);
        }
    });
    
    destinationInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            findRouteBtn.click();
        }
    });
}

function findSafeRoute(destination, resultsElement) {
    const findRouteBtn = document.getElementById('find-route');
    
    // Show loading state
    findRouteBtn.textContent = 'Finding Route...';
    findRouteBtn.disabled = true;
    
    setTimeout(() => {
        resultsElement.innerHTML = `
            <div class="route-option safe-route">
                <i class="fas fa-shield-check"></i>
                <div class="route-info">
                    <strong>Safest Route to ${destination}</strong>
                    <span>12 min • Well-lit streets • Low crime area</span>
                </div>
            </div>
            <div class="route-option" style="border-color: #f59e0b; margin-top: 0.5rem;">
                <i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i>
                <div class="route-info">
                    <strong>Alternative Route</strong>
                    <span>8 min • Faster but less safe • Avoid after dark</span>
                </div>
            </div>
        `;
        resultsElement.classList.add('active');
        
        findRouteBtn.textContent = 'Find Safe Route';
        findRouteBtn.disabled = false;
    }, 2000);
}

// Community Network Demo
function startCommunityDemo() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent === 'Share Safety Tip') {
                shareSafetyTip();
            } else if (this.textContent === 'Request Help') {
                requestHelp();
            }
        });
    });
}

function shareSafetyTip() {
    const communityFeed = document.querySelector('.community-feed');
    const newUpdate = document.createElement('div');
    newUpdate.className = 'safety-update';
    newUpdate.style.background = '#f0f9ff';
    newUpdate.style.border = '2px solid #06b6d4';
    newUpdate.innerHTML = `
        <div class="update-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="update-content">
            <strong>You</strong>
            <p>The coffee shop near Rajouri Garden Metro has great WiFi and feels very safe during the day!</p>
            <span class="update-time">Just now</span>
        </div>
    `;
    
    communityFeed.insertBefore(newUpdate, communityFeed.children[2]);
    
    // Animate in
    newUpdate.style.opacity = '0';
    newUpdate.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        newUpdate.style.transition = 'all 0.3s ease';
        newUpdate.style.opacity = '1';
        newUpdate.style.transform = 'translateY(0)';
    }, 100);
}

function requestHelp() {
    const communityFeed = document.querySelector('.community-feed');
    const helpRequest = document.createElement('div');
    helpRequest.className = 'safety-update';
    helpRequest.style.background = '#fef3c7';
    helpRequest.style.border = '2px solid #f59e0b';
    helpRequest.innerHTML = `
        <div class="update-avatar">
            <i class="fas fa-hand-paper"></i>
        </div>
        <div class="update-content">
            <strong>Help Request Sent</strong>
            <p>Nearby safety ambassadors and travelers have been notified of your request for assistance.</p>
            <span class="update-time">Just now</span>
        </div>
    `;
    
    communityFeed.insertBefore(helpRequest, communityFeed.children[2]);
    
    // Animate in
    helpRequest.style.opacity = '0';
    helpRequest.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        helpRequest.style.transition = 'all 0.3s ease';
        helpRequest.style.opacity = '1';
        helpRequest.style.transform = 'translateY(0)';
    }, 100);
}
// Authentication System with Firebase Integration
let currentUser = null;
let isLoggedIn = false;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Firebase to initialize, then check auth state
    setTimeout(() => {
        if (window.firebaseDataManager && window.firebaseDataManager.currentUser) {
            currentUser = window.firebaseDataManager.getCurrentUser();
            if (currentUser) {
                isLoggedIn = true;
                updateUIForLoggedInUser();
            }
        } else {
            // Fallback to local storage
            currentUser = window.rakshitaData?.getCurrentUser();
            if (currentUser) {
                isLoggedIn = true;
                updateUIForLoggedInUser();
            }
        }
    }, 1000);
    
    initializeFeatureDemos();
});

// Modal Functions
function openLoginModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('active');
    switchToLogin();
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.remove('active');
}

function switchToLogin() {
    document.getElementById('login-form').style.display = 'flex';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('modal-title').textContent = 'Welcome Back to Rakshita';
}

function switchToRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'flex';
    document.getElementById('modal-title').textContent = 'Join Rakshita Safety Network';
}

// Authentication Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Login Form
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        if (email && password) {
            login(email, password);
        }
    });
    
    // Register Form
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const phone = document.getElementById('register-phone').value;
        const password = document.getElementById('register-password').value;
        const emergencyContact = document.getElementById('emergency-contact').value;
        
        if (name && email && phone && password && emergencyContact) {
            register(name, email, phone, password, emergencyContact);
        }
    });
    
    // Dashboard Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            switchDashboardSection(section);
        });
    });
    
    // Close modal when clicking outside
    document.getElementById('auth-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeAuthModal();
        }
    });
    
    // Close dashboard when clicking outside
    document.getElementById('user-dashboard').addEventListener('click', function(e) {
        if (e.target === this) {
            closeDashboard();
        }
    });
});

async function login(email, password) {
    // Show loading state
    const loginBtn = document.querySelector('#login-form .auth-btn');
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;
    
    try {
        // Try Firebase first, fallback to local storage
        let user;
        if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
            user = await window.firebaseDataManager.loginUser(email, password);
        } else {
            user = await window.rakshitaData.loginUser(email, password);
        }
        
        if (user) {
            currentUser = user;
            isLoggedIn = true;
            updateUIForLoggedInUser();
            closeAuthModal();
            
            // Log activity
            if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
                await window.firebaseDataManager.logActivity({
                    type: 'user_login',
                    description: 'User logged in successfully'
                });
            } else {
                window.rakshitaData.logActivity({
                    type: 'user_login',
                    description: 'User logged in successfully'
                });
            }
            
            showNotification('Welcome back! You are now logged in to Rakshita.', 'success');
        } else {
            showNotification('Invalid credentials. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Login failed: ' + error.message, 'error');
    } finally {
        loginBtn.textContent = 'Login to Dashboard';
        loginBtn.disabled = false;
    }
}

async function register(name, email, phone, password, emergencyContact) {
    // Show loading state
    const registerBtn = document.querySelector('#register-form .auth-btn');
    registerBtn.textContent = 'Creating Account...';
    registerBtn.disabled = true;
    
    try {
        // Try Firebase first, fallback to local storage
        let user;
        if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
            user = await window.firebaseDataManager.registerUser({
                name,
                email,
                phone,
                password,
                emergencyContact
            });
        } else {
            user = await window.rakshitaData.registerUser({
                name,
                email,
                phone,
                password,
                emergencyContact
            });
        }
        
        if (user) {
            currentUser = user;
            isLoggedIn = true;
            updateUIForLoggedInUser();
            closeAuthModal();
            
            // Log activity
            if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
                await window.firebaseDataManager.logActivity({
                    type: 'user_registration',
                    description: 'New user account created'
                });
            } else {
                window.rakshitaData.logActivity({
                    type: 'user_registration',
                    description: 'New user account created'
                });
            }
            
            showNotification('Account created successfully! Welcome to Rakshita.', 'success');
            setTimeout(() => {
                openDashboard();
            }, 1000);
        } else {
            showNotification('Registration failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Registration failed: ' + error.message, 'error');
    } finally {
        registerBtn.textContent = 'Create Account';
        registerBtn.disabled = false;
    }
}

function updateUIForLoggedInUser() {
    // Hide login button, show user menu
    document.querySelector('.nav-menu').style.display = 'none';
    document.getElementById('user-menu').style.display = 'flex';
    
    // Update user name in UI
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('dashboard-user-name').textContent = currentUser.name.split(' ')[0];
    
    // Update hero button
    const heroBtn = document.querySelector('.hero-buttons .btn-primary');
    heroBtn.innerHTML = '<i class="fas fa-tachometer-alt"></i> Open Dashboard';
    heroBtn.onclick = openDashboard;
}

async function logout() {
    // Clear user data from Firebase and local storage
    if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
        await window.firebaseDataManager.logoutUser();
    } else {
        window.rakshitaData.logoutUser();
    }
    
    currentUser = null;
    isLoggedIn = false;
    
    // Show login button, hide user menu
    document.querySelector('.nav-menu').style.display = 'flex';
    document.getElementById('user-menu').style.display = 'none';
    
    // Reset hero button
    const heroBtn = document.querySelector('.hero-buttons .btn-primary');
    heroBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Start Using Now';
    heroBtn.onclick = openLoginModal;
    
    // Close dashboard if open
    closeDashboard();
    
    showNotification('You have been logged out successfully.', 'info');
}

// Dashboard Functions
function openDashboard() {
    if (!isLoggedIn) {
        openLoginModal();
        return;
    }
    
    const dashboard = document.getElementById('user-dashboard');
    dashboard.classList.add('active');
    
    // Initialize dashboard data
    initializeDashboard();
}

function closeDashboard() {
    const dashboard = document.getElementById('user-dashboard');
    dashboard.classList.remove('active');
}

function minimizeDashboard() {
    // Implement minimize functionality
    const dashboard = document.getElementById('user-dashboard');
    dashboard.style.transform = 'scale(0.8)';
    dashboard.style.opacity = '0.8';
    
    setTimeout(() => {
        dashboard.style.transform = 'scale(1)';
        dashboard.style.opacity = '1';
    }, 300);
}

function switchDashboardSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName + '-section').classList.add('active');
    
    // Add active class to clicked nav item
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    // Initialize section-specific functionality
    initializeSectionData(sectionName);
}

function initializeDashboard() {
    // Update real-time data
    updateLocationData();
    updateActivityFeed();
    updateStats();
    
    // Start real-time updates
    setInterval(updateLocationData, 30000); // Update every 30 seconds
    setInterval(updateActivityFeed, 60000); // Update every minute
}

function initializeSectionData(section) {
    switch(section) {
        case 'location':
            initializeLocationTracking();
            break;
        case 'emergency':
            initializeEmergencyPanel();
            break;
        case 'routes':
            initializeRoutePanel();
            break;
        case 'safety':
            initializeSafetyZoneManagement();
            break;
        case 'community':
            // Community system is handled by community.js
            console.log('Community section activated');
            break;
    }
}

// Enhanced location function that uses the reliable enhanced location manager
async function getHighAccuracyLocation() {
    console.log('🎯 Getting high-accuracy location with enhanced system...');
    
    // Check if Enhanced Location Manager is available
    if (window.enhancedLocationManager && window.enhancedLocationManager.isAvailable()) {
        console.log('🚀 Using Enhanced Location Manager');
        try {
            return await window.enhancedLocationManager.getHighAccuracyLocation();
        } catch (error) {
            console.warn('⚠️ Enhanced location failed, falling back to standard GPS:', error);
        }
    }
    
    // Fallback to standard GPS method
    console.log('📍 Using standard GPS method');
    return await getStandardGPSLocation();
}

// Standard GPS location method (fallback)
async function getStandardGPSLocation() {
    if (!navigator.geolocation) {
        throw new Error('Geolocation not supported');
    }
    
    // Try multiple location attempts with increasingly aggressive settings
    const attempts = [];
    const maxAttempts = 5;
    
    for (let i = 0; i < maxAttempts; i++) {
        try {
            console.log(`📡 GPS attempt ${i + 1}/${maxAttempts} - Forcing satellite lock...`);
            
            const position = await new Promise((resolve, reject) => {
                const options = {
                    enableHighAccuracy: true,
                    timeout: 45000, // Very long timeout for GPS to get proper lock
                    maximumAge: 0 // Always get fresh location, no caching
                };
                
                navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
            
            attempts.push({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                timestamp: position.timestamp,
                attempt: i + 1
            });
            
            console.log(`📍 Attempt ${i + 1}: ±${Math.round(position.coords.accuracy)}m accuracy`);
            
            // Accept readings under 100m as good enough
            if (position.coords.accuracy <= 100) {
                console.log(`✅ Acceptable accuracy achieved: ±${Math.round(position.coords.accuracy)}m`);
                return {
                    coords: position.coords,
                    timestamp: position.timestamp
                };
            } else if (position.coords.accuracy <= 500) {
                console.log(`⚠️ Moderate accuracy, continuing to try for better...`);
            } else {
                console.log(`❌ Poor accuracy (±${Math.round(position.coords.accuracy)}m), retrying...`);
            }
            
            // Longer delay between attempts for GPS to stabilize
            if (i < maxAttempts - 1) {
                console.log('⏳ Waiting 5 seconds for GPS to improve...');
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
            
        } catch (error) {
            console.log(`❌ Attempt ${i + 1} failed: ${error.message}`);
            if (error.code === 1) { // PERMISSION_DENIED
                throw error; // Don't retry permission errors
            }
            if (i === maxAttempts - 1 && attempts.length === 0) {
                throw error;
            }
        }
    }
    
    // Pick the most accurate result
    if (attempts.length > 0) {
        const bestAttempt = attempts.reduce((best, current) => 
            current.accuracy < best.accuracy ? current : best
        );
        
        console.log(`🎯 Using best result from attempt ${bestAttempt.attempt}: ±${Math.round(bestAttempt.accuracy)}m`);
        
        if (bestAttempt.accuracy > 1000) {
            console.warn('⚠️ GPS accuracy is very poor - user may be indoors or have poor GPS signal');
        }
        
        // Return in the same format as geolocation API
        return {
            coords: {
                latitude: bestAttempt.latitude,
                longitude: bestAttempt.longitude,
                accuracy: bestAttempt.accuracy
            },
            timestamp: bestAttempt.timestamp
        };
    }
    
    throw new Error('All GPS attempts failed - check location permissions and GPS signal');
}

function updateLocationData() {
    console.log('🔄 Starting high-accuracy location update...');
    
    // Show loading state
    const coordsElement = document.getElementById('current-coords');
    const addressElement = document.getElementById('current-address');
    const metaElement = document.getElementById('location-meta');
    
    if (coordsElement) coordsElement.textContent = 'Getting precise location...';
    if (addressElement) addressElement.textContent = 'Waiting for location...';
    if (metaElement) metaElement.innerHTML = '<small>📡 Acquiring high-accuracy GPS...</small>';
    
    getHighAccuracyLocation()
        .then(async (position) => {
            console.log(`📍 High-accuracy location acquired: ${position.coords.latitude}, ${position.coords.longitude} (±${Math.round(position.coords.accuracy)}m)`);
            
            const locationData = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                timestamp: new Date().toISOString()
            };
            
            // Save location using data manager
            let savedLocation;
            if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
                savedLocation = await window.firebaseDataManager.saveLocation(locationData);
            } else {
                savedLocation = window.rakshitaData.saveLocation(locationData);
            }
            
            // Update UI with precise coordinates
            if (coordsElement) {
                coordsElement.textContent = `${savedLocation.latitude.toFixed(6)}, ${savedLocation.longitude.toFixed(6)}`;
            }
            
            // Update accuracy display
            if (metaElement) {
                const accuracyText = savedLocation.accuracy <= 10 ? 'Excellent' : 
                                   savedLocation.accuracy <= 50 ? 'Good' : 
                                   savedLocation.accuracy <= 100 ? 'Fair' : 'Poor';
                const accuracyColor = savedLocation.accuracy <= 10 ? '#28a745' : 
                                     savedLocation.accuracy <= 50 ? '#17a2b8' : 
                                     savedLocation.accuracy <= 100 ? '#ffc107' : '#dc3545';
                
                metaElement.innerHTML = `
                    <small>
                        📡 GPS Accuracy: <span style="color: ${accuracyColor}; font-weight: bold;">
                            ${accuracyText} (±${Math.round(savedLocation.accuracy)}m)
                        </span>
                    </small>
                `;
            }
            
            // Get real address using reverse geocoding
            const retryButton = document.getElementById('retry-address');
            
            if (addressElement) {
                addressElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Finding address...';
                if (retryButton) retryButton.style.display = 'none';
            }
            
            try {
                console.log('🔍 Starting address lookup...');
                const address = await getRealAddress(savedLocation.latitude, savedLocation.longitude);
                
                if (addressElement) {
                    addressElement.textContent = address;
                    console.log('✅ Address displayed successfully');
                }
                
            } catch (error) {
                console.error('❌ Address lookup failed:', error);
                
                if (addressElement) {
                    const coords = `${savedLocation.latitude.toFixed(4)}, ${savedLocation.longitude.toFixed(4)}`;
                    
                    if (error.message.includes('timeout') || error.message.includes('AbortError')) {
                        addressElement.textContent = `Address lookup timed out`;
                        showNotification('Address lookup timed out. Showing coordinates. Click retry to try again.', 'warning');
                    } else {
                        addressElement.textContent = `Address unavailable`;
                        showNotification('Address lookup failed. Showing coordinates. Click retry to try again.', 'info');
                    }
                    
                    // Show coordinates after a brief delay
                    setTimeout(() => {
                        if (addressElement.textContent.includes('timed out') || addressElement.textContent.includes('unavailable')) {
                            addressElement.textContent = coords;
                        }
                    }, 2000);
                    
                    // Show retry button
                    if (retryButton) {
                        retryButton.style.display = 'block';
                        retryButton.onclick = () => retryAddressLookup(savedLocation);
                    }
                }
            }
            
            // Log activity
            if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
                await window.firebaseDataManager.logActivity({
                    type: 'location_update',
                    description: `High-accuracy location updated - Accuracy: ${savedLocation.accuracy}m`,
                    data: { 
                        accuracy: savedLocation.accuracy,
                        latitude: savedLocation.latitude,
                        longitude: savedLocation.longitude
                    }
                });
            } else {
                window.rakshitaData.logActivity({
                    type: 'location_update',
                    description: `High-accuracy location updated - Accuracy: ${savedLocation.accuracy}m`,
                    data: { 
                        accuracy: savedLocation.accuracy,
                        latitude: savedLocation.latitude,
                        longitude: savedLocation.longitude
                    }
                });
            }
            
            // Update location status
            updateLocationStatus(savedLocation.accuracy);
            
            // Show success notification
            const accuracyText = savedLocation.accuracy <= 10 ? 'excellent' : 
                               savedLocation.accuracy <= 50 ? 'good' : 
                               savedLocation.accuracy <= 100 ? 'fair' : 'poor';
            
            showNotification(`Location updated with ${accuracyText} accuracy (±${Math.round(savedLocation.accuracy)}m)`, 
                           savedLocation.accuracy <= 50 ? 'success' : 'info');
            
        })
        .catch((error) => {
            console.error('❌ High-accuracy location failed:', error);
            handleLocationError(error);
        });
}

function updateActivityFeed() {
    // Get real activity data from data manager
    const activities = window.rakshitaData.getRecentActivities(4);
    
    const feedElement = document.querySelector('.activity-feed');
    if (feedElement && activities.length > 0) {
        feedElement.innerHTML = activities.map(activity => {
            const icon = getActivityIcon(activity.type);
            const timeAgo = getTimeAgo(activity.timestamp);
            
            return `
                <div class="activity-item">
                    <i class="${icon}"></i>
                    <div>
                        <p>${activity.description}</p>
                        <small>${timeAgo}</small>
                    </div>
                </div>
            `;
        }).join('');
    } else if (feedElement) {
        // Fallback to default activities if no real data
        feedElement.innerHTML = `
            <div class="activity-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <p>Location tracking started</p>
                    <small>Just now</small>
                </div>
            </div>
        `;
    }
}

function getActivityIcon(type) {
    const icons = {
        'user_login': 'fas fa-sign-in-alt',
        'user_registration': 'fas fa-user-plus',
        'location_update': 'fas fa-map-marker-alt',
        'emergency_alert': 'fas fa-exclamation-triangle',
        'route_planned': 'fas fa-route',
        'community_update': 'fas fa-users',
        'safety_zone_entered': 'fas fa-shield-check',
        'safety_zone_exited': 'fas fa-shield-alt'
    };
    return icons[type] || 'fas fa-info-circle';
}

function getTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
}

function updateStats() {
    // Simulate dynamic stats
    const stats = {
        activeTime: Math.floor(Math.random() * 5) + 2 + 'h ' + Math.floor(Math.random() * 60) + 'm',
        distance: (Math.random() * 10 + 1).toFixed(1) + ' km',
        nearbyTravelers: Math.floor(Math.random() * 20) + 5
    };
    
    // Update stat values if elements exist
    const timeElement = document.querySelector('.stat-card:nth-child(2) .stat-value');
    const distanceElement = document.querySelector('.stat-card:nth-child(3) .stat-value');
    const travelersElement = document.querySelector('.stat-card:nth-child(4) .stat-value');
    
    if (timeElement) timeElement.textContent = stats.activeTime;
    if (distanceElement) distanceElement.textContent = stats.distance;
    if (travelersElement) travelersElement.textContent = stats.nearbyTravelers;
}

function initializeLocationTracking() {
    console.log('🎯 Initializing Live Location Tracking...');
    
    const trackingToggle = document.getElementById('tracking-toggle');
    if (trackingToggle) {
        trackingToggle.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                // Stop tracking
                stopLiveTracking();
                this.classList.remove('active');
                this.innerHTML = '<i class="fas fa-play"></i> Resume Tracking';
                this.style.background = '#f59e0b';
                showNotification('Location tracking paused', 'info');
            } else {
                // Start tracking
                startLiveTracking();
                this.classList.add('active');
                this.innerHTML = '<i class="fas fa-pause"></i> Pause Tracking';
                this.style.background = '#10b981';
                showNotification('Location tracking resumed', 'success');
            }
        });
    }
    
    // Auto-start tracking when section is opened
    startLiveTracking();
}

// Live tracking variables
let liveTrackingId = null;
let trackingActive = false;
let lastKnownLocation = null;

function startLiveTracking() {
    if (liveTrackingId || !navigator.geolocation) {
        console.log('Live tracking already active or geolocation not supported');
        return;
    }
    
    console.log('🚀 Starting enhanced live location tracking...');
    trackingActive = true;
    
    // Check if Enhanced Location Manager is available
    if (window.enhancedLocationManager && window.enhancedLocationManager.isAvailable()) {
        console.log('🚀 Using Enhanced Location Manager for live tracking');
        
        liveTrackingId = window.enhancedLocationManager.startLocationTracking(
            (enhancedPosition) => {
                console.log(`📍 Enhanced location: ±${Math.round(enhancedPosition.coords.accuracy)}m`);
                updateLiveLocation(enhancedPosition);
            },
            (error) => {
                console.error('❌ Enhanced location tracking error:', error);
                handleTrackingError(error);
            }
        );
    } else {
        console.log('📍 Using standard GPS tracking');
        
        // Standard GPS tracking as fallback
        const options = {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 5000
        };
        
        liveTrackingId = navigator.geolocation.watchPosition(
            (position) => {
                console.log(`📡 GPS reading: ±${Math.round(position.coords.accuracy)}m`);
                
                // Filter out very poor readings
                if (position.coords.accuracy <= 1000) {
                    updateLiveLocation({
                        coords: position.coords,
                        timestamp: position.timestamp,
                        source: 'standard-gps'
                    });
                } else {
                    console.log(`❌ Rejecting poor reading: ±${Math.round(position.coords.accuracy)}m`);
                }
            },
            (error) => {
                console.error('GPS tracking error:', error);
                handleTrackingError(error);
            },
            options
        );
    }
    
    // Update tracking status
    updateTrackingStatus('active');
    
    console.log('✅ Enhanced live tracking started with ID:', liveTrackingId);
    showNotification('Enhanced location tracking started. System will automatically improve accuracy.', 'info');
}

function stopLiveTracking() {
    if (liveTrackingId) {
        // Check if using Enhanced Location Manager
        if (window.enhancedLocationManager && window.enhancedLocationManager.isAvailable()) {
            window.enhancedLocationManager.stopLocationTracking();
        } else {
            navigator.geolocation.clearWatch(liveTrackingId);
        }
        
        liveTrackingId = null;
        trackingActive = false;
        
        console.log('⏹️ Enhanced live tracking stopped');
        updateTrackingStatus('paused');
    }
}

function updateLiveLocation(position) {
    const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        speed: position.coords.speed,
        heading: position.coords.heading,
        timestamp: new Date().toISOString()
    };
    
    console.log(`📍 Live location update: ${newLocation.latitude.toFixed(6)}, ${newLocation.longitude.toFixed(6)} (±${Math.round(newLocation.accuracy)}m)`);
    
    // Update current location
    lastKnownLocation = newLocation;
    
    // Update UI elements with accuracy info
    updateLocationDisplay(newLocation);
    updateMapVisualization(newLocation);
    updateLocationInfo(newLocation);
    
    // Update accuracy display
    const accuracyElement = document.getElementById('tracking-accuracy');
    if (accuracyElement) {
        const accuracyText = newLocation.accuracy <= 10 ? 'Excellent' : 
                           newLocation.accuracy <= 50 ? 'Good' : 
                           newLocation.accuracy <= 100 ? 'Fair' : 'Poor';
        const accuracyColor = newLocation.accuracy <= 10 ? '#28a745' : 
                             newLocation.accuracy <= 50 ? '#17a2b8' : 
                             newLocation.accuracy <= 100 ? '#ffc107' : '#dc3545';
        
        accuracyElement.innerHTML = `<span style="color: ${accuracyColor}; font-weight: bold;">${accuracyText} (±${Math.round(newLocation.accuracy)}m)</span>`;
    }
    
    // Save to storage
    saveLocationData(newLocation);
    
    // Check for zone alerts if safety zones are active
    if (typeof checkZoneAlerts === 'function') {
        checkZoneAlerts(newLocation);
    }
}

function updateLiveLocationDisplay(location) {
    // Update coordinates
    const coordsElement = document.getElementById('current-coords');
    if (coordsElement) {
        coordsElement.textContent = `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
    }
    
    // Update address
    updateAddressFromLocation(location);
    
    // Update location meta info
    const metaElement = document.getElementById('location-meta');
    if (metaElement) {
        const accuracy = Math.round(location.accuracy);
        const timestamp = new Date(location.timestamp).toLocaleTimeString();
        
        metaElement.innerHTML = `
            <small>
                Accuracy: ±${accuracy}m | Updated: ${timestamp}
                ${location.speed ? ` | Speed: ${(location.speed * 3.6).toFixed(1)} km/h` : ''}
            </small>
        `;
    }
}

async function retryAddressLookup(location) {
    const addressElement = document.getElementById('current-address');
    const retryButton = document.getElementById('retry-address');
    
    if (!addressElement || !location) return;
    
    try {
        addressElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Retrying address lookup...';
        if (retryButton) retryButton.style.display = 'none';
        
        const address = await getRealAddress(location.latitude, location.longitude);
        addressElement.textContent = address;
        showNotification('Address found successfully!', 'success');
        
    } catch (error) {
        console.log('Address retry failed:', error.message);
        
        if (error.message.includes('timeout') || error.message.includes('AbortError')) {
            addressElement.textContent = 'Address lookup still timing out';
            showNotification('Address lookup still timing out. Check your internet connection.', 'error');
        } else {
            addressElement.textContent = 'Address still unavailable';
            showNotification('Address lookup still failing. Using coordinates instead.', 'error');
        }
        
        // Show coordinates and keep retry button
        setTimeout(() => {
            addressElement.textContent = `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
            if (retryButton) retryButton.style.display = 'block';
        }, 2000);
    }
}

async function updateAddressFromLocation(location) {
    const addressElement = document.getElementById('current-address');
    const retryButton = document.getElementById('retry-address');
    
    if (!addressElement) return;
    
    try {
        addressElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Looking up address...';
        if (retryButton) retryButton.style.display = 'none';
        
        const address = await getRealAddress(location.latitude, location.longitude);
        addressElement.textContent = address;
        
    } catch (error) {
        console.log('Address update failed:', error.message);
        
        if (error.message.includes('timeout') || error.message.includes('AbortError')) {
            addressElement.textContent = 'Address lookup timed out';
            showNotification('Address lookup timed out. Click retry button.', 'warning');
        } else {
            addressElement.textContent = 'Address unavailable';
            showNotification('Address lookup failed. Click retry button.', 'info');
        }
        
        // Show retry button and coordinates
        if (retryButton) {
            retryButton.style.display = 'block';
            retryButton.onclick = () => retryAddressLookup(location);
        }
        
        setTimeout(() => {
            if (addressElement.textContent.includes('timed out') || addressElement.textContent.includes('unavailable')) {
                addressElement.textContent = `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
            }
        }, 2000);
    }
}

function updateMapVisualization(location) {
    const userLocationElement = document.querySelector('.user-location');
    if (userLocationElement) {
        // Add pulse animation to show active tracking
        userLocationElement.style.animation = 'pulse 2s infinite';
        userLocationElement.style.background = '#10b981';
        
        // Update position if we had a map (for now just animate)
        userLocationElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            userLocationElement.style.transform = 'scale(1)';
        }, 500);
    }
}

function updateLocationInfo(location) {
    // Update accuracy info
    const accuracyInfo = document.createElement('div');
    accuracyInfo.className = 'accuracy-info';
    accuracyInfo.innerHTML = `
        <small style="color: #6b7280;">
            Accuracy: ±${Math.round(location.accuracy)}m
            ${location.speed ? ` | Speed: ${(location.speed * 3.6).toFixed(1)} km/h` : ''}
        </small>
    `;
    
    // Add or update accuracy info
    const locationPanel = document.querySelector('.current-location');
    if (locationPanel) {
        const existingAccuracy = locationPanel.querySelector('.accuracy-info');
        if (existingAccuracy) {
            existingAccuracy.replaceWith(accuracyInfo);
        } else {
            locationPanel.appendChild(accuracyInfo);
        }
    }
}

function updateTrackingStatus(status) {
    const statusElements = document.querySelectorAll('.status');
    statusElements.forEach(element => {
        if (status === 'active') {
            element.textContent = 'Active';
            element.className = 'status active';
            element.style.color = '#10b981';
        } else {
            element.textContent = 'Paused';
            element.className = 'status paused';
            element.style.color = '#f59e0b';
        }
    });
}

function handleTrackingError(error) {
    console.error('Live tracking error:', error);
    
    let errorMessage = 'Location tracking error';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location unavailable';
            break;
        case error.TIMEOUT:
            errorMessage = 'Location request timeout';
            break;
    }
    
    showNotification(errorMessage, 'error');
    
    // Update UI to show error state
    updateTrackingStatus('error');
    
    // Stop tracking
    stopLiveTracking();
    
    // Update toggle button
    const trackingToggle = document.getElementById('tracking-toggle');
    if (trackingToggle) {
        trackingToggle.classList.remove('active');
        trackingToggle.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Retry';
        trackingToggle.style.background = '#ef4444';
    }
}

function initializeEmergencyPanel() {
    const sosBtn = document.querySelector('.sos-main-btn');
    if (sosBtn) {
        let pressTimer;
        
        sosBtn.addEventListener('mousedown', function() {
            pressTimer = setTimeout(() => {
                triggerEmergencyAlert();
            }, 3000);
            
            this.style.background = '#ef4444';
            this.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Hold for 3 seconds...</span>';
        });
        
        sosBtn.addEventListener('mouseup', function() {
            clearTimeout(pressTimer);
            this.style.background = '';
            this.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>EMERGENCY SOS</span>';
        });
        
        sosBtn.addEventListener('mouseleave', function() {
            clearTimeout(pressTimer);
            this.style.background = '';
            this.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>EMERGENCY SOS</span>';
        });
    }
    
    // Call buttons
    document.querySelectorAll('.call-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const contact = this.previousElementSibling.textContent;
            showNotification(`Calling ${contact}...`, 'info');
        });
    });
}

async function triggerEmergencyAlert() {
    try {
        // Get current location for emergency
        const currentLocation = window.rakshitaData.getCurrentLocation();
        
        // Trigger emergency alert through data manager
        const alert = await window.rakshitaData.triggerEmergencyAlert({
            location: currentLocation,
            message: 'Emergency assistance needed - triggered from web dashboard'
        });
        
        showNotification('🚨 EMERGENCY ALERT SENT! Authorities and contacts have been notified.', 'emergency');
        
        // Simulate emergency response
        setTimeout(() => {
            showNotification('Emergency services are en route. Estimated arrival: 4 minutes.', 'info');
        }, 2000);
        
        return alert;
    } catch (error) {
        console.error('Emergency alert failed:', error);
        showNotification('Failed to send emergency alert. Please try again.', 'error');
    }
}

function initializeRoutePanel() {
    console.log('🛣️ Initializing Enhanced Route Panel with Place Name Support...');
    
    const planBtn = document.querySelector('#plan-route-btn');
    const fromInput = document.querySelector('#route-from');
    const toInput = document.querySelector('#route-to');
    const routeOptions = document.querySelector('#route-options');
    const routeMapPreview = document.querySelector('#route-map-preview');
    const travelTimeSelect = document.querySelector('#travel-time');
    const customTimeInput = document.querySelector('#custom-time');
    
    // Initialize current location with enhanced accuracy
    updateCurrentLocationDisplay();
    
    // Travel time selection
    if (travelTimeSelect && customTimeInput) {
        travelTimeSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customTimeInput.style.display = 'block';
                customTimeInput.required = true;
            } else {
                customTimeInput.style.display = 'none';
                customTimeInput.required = false;
            }
        });
    }
    
    // Enhanced current location button
    const useCurrentBtn = document.querySelector('#use-current-location');
    if (useCurrentBtn) {
        useCurrentBtn.addEventListener('click', function() {
            updateCurrentLocationDisplay();
        });
    }
    
    // Enhanced place search button
    const searchBtn = document.querySelector('#search-places');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            showPlaceSuggestions(toInput);
        });
    }
    
    // Enhanced route planning with place name support
    if (planBtn && toInput && routeOptions) {
        planBtn.addEventListener('click', function() {
            const destination = toInput.value.trim();
            if (!destination) {
                toInput.focus();
                showNotification('Please enter a destination (place name or address)', 'warning');
                return;
            }
            
            // Get user preferences
            const preferences = {
                avoidDanger: document.querySelector('#avoid-danger-zones')?.checked || false,
                preferWellLit: document.querySelector('#prefer-well-lit')?.checked || false,
                preferCrowded: document.querySelector('#prefer-crowded')?.checked || false,
                policePresence: document.querySelector('#police-presence')?.checked || false,
                travelTime: travelTimeSelect?.value || 'now'
            };
            
            // Use enhanced route planning
            planOpenStreetMapRoute(destination, preferences);
        });
        
        // Enter key support
        toInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                planBtn.click();
            }
        });
    }
    
    // Add place name autocomplete
    if (toInput) {
        addPlaceAutocomplete(toInput);
    }
    
    // Initialize saved routes functionality
    initializeSavedRoutes();
    
    // Initialize route history
    initializeRouteHistory();
    
    console.log('✅ Enhanced Route Panel initialized with place name support');
}

async function updateCurrentLocationDisplay() {
    const fromInput = document.querySelector('#route-from');
    const useCurrentBtn = document.querySelector('#use-current-location');
    
    if (!fromInput) return;
    
    try {
        if (useCurrentBtn) {
            useCurrentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        }
        
        fromInput.value = 'Getting precise location...';
        
        // Use enhanced location system
        const location = await getCurrentLocationWithFallback();
        
        // Try to get a readable address
        try {
            const address = await getRealAddress(location.lat, location.lng);
            fromInput.value = `📍 ${address}`;
        } catch (error) {
            fromInput.value = `📍 Current Location (${location.lat.toFixed(4)}, ${location.lng.toFixed(4)})`;
        }
        
        if (useCurrentBtn) {
            useCurrentBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
        }
        
        showNotification('Location updated successfully', 'success');
        
    } catch (error) {
        console.error('Location update failed:', error);
        fromInput.value = "📍 Current Location (Enable GPS for precise location)";
        
        if (useCurrentBtn) {
            useCurrentBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
        }
        
        showNotification('Unable to get current location. Please enable GPS.', 'error');
    }
}

function showPlaceSuggestions(toInput) {
    const suggestions = [
        // Popular Delhi locations
        'India Gate, New Delhi',
        'Red Fort, Delhi', 
        'Connaught Place, New Delhi',
        'Lotus Temple, Delhi',
        'Qutub Minar, Delhi',
        'Humayun\'s Tomb, Delhi',
        'Akshardham Temple, Delhi',
        'Chandni Chowk, Delhi',
        
        // Transportation hubs
        'New Delhi Railway Station',
        'Indira Gandhi International Airport',
        'Kashmere Gate Metro Station',
        'Rajiv Chowk Metro Station',
        
        // Shopping areas
        'Khan Market, Delhi',
        'Karol Bagh Market',
        'Lajpat Nagar Market',
        'Sarojini Nagar Market',
        
        // Educational institutions
        'Delhi University',
        'JNU - Jawaharlal Nehru University',
        'IIT Delhi',
        
        // Hospitals
        'AIIMS Delhi',
        'Safdarjung Hospital',
        'Apollo Hospital Delhi'
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    toInput.value = randomSuggestion;
    showNotification(`Suggested: ${randomSuggestion}`, 'info');
}

function addPlaceAutocomplete(input) {
    // Create suggestions dropdown
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'place-suggestions';
    suggestionsDiv.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #d1d5db;
        border-top: none;
        border-radius: 0 0 8px 8px;
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
        display: none;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    // Make input container relative
    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(suggestionsDiv);
    
    // Common places for suggestions
    const commonPlaces = [
        'India Gate', 'Red Fort', 'Connaught Place', 'Lotus Temple', 'Qutub Minar',
        'Airport', 'Railway Station', 'Metro Station', 'Hospital', 'Mall',
        'University', 'Market', 'Temple', 'Gurudwara', 'Mosque', 'Church'
    ];
    
    input.addEventListener('input', function() {
        const value = this.value.toLowerCase().trim();
        
        if (value.length < 2) {
            suggestionsDiv.style.display = 'none';
            return;
        }
        
        const matches = commonPlaces.filter(place => 
            place.toLowerCase().includes(value)
        );
        
        if (matches.length > 0) {
            suggestionsDiv.innerHTML = matches.map(place => `
                <div class="suggestion-item" style="padding: 0.75rem; cursor: pointer; border-bottom: 1px solid #f3f4f6; display: flex; align-items: center; gap: 0.5rem;" 
                     onmouseover="this.style.background='#f9fafb'" 
                     onmouseout="this.style.background='white'"
                     onclick="selectPlace('${place}', '${input.id}')">
                    <i class="fas fa-map-marker-alt" style="color: #6b7280;"></i>
                    <span>${place}</span>
                </div>
            `).join('');
            suggestionsDiv.style.display = 'block';
        } else {
            suggestionsDiv.style.display = 'none';
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!input.contains(e.target) && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.style.display = 'none';
        }
    });
}

function selectPlace(place, inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.value = place;
        const suggestionsDiv = input.parentElement.querySelector('.place-suggestions');
        if (suggestionsDiv) {
            suggestionsDiv.style.display = 'none';
        }
    }
}

function planSafeRoute(destination, resultsElement, mapElement, preferences) {
    const planBtn = document.querySelector('#plan-route-btn');
    
    // Update button state
    planBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing Routes...';
    planBtn.disabled = true;
    
    // Clear previous results
    resultsElement.innerHTML = '';
    mapElement.style.display = 'none';
    
    // Simulate AI analysis
    setTimeout(() => {
        const routes = generateRouteOptions(destination, preferences);
        displayRouteOptions(routes, resultsElement, mapElement);
        
        // Reset button
        planBtn.innerHTML = '<i class="fas fa-route"></i> Plan Safe Route';
        planBtn.disabled = false;
        
        // Add to history
        addToRouteHistory(destination);
        
        showNotification(`Found ${routes.length} safe route options`, 'success');
    }, 2500);
}

function generateRouteOptions(destination, preferences) {
    const baseRoutes = [
        {
            id: 1,
            name: 'Safest Route',
            type: 'safest',
            duration: '15 min',
            distance: '3.2 km',
            safetyScore: 95,
            features: ['Well-lit streets', 'Police presence', 'Low crime area', 'CCTV coverage'],
            warnings: [],
            icon: 'fas fa-shield-check',
            color: 'success'
        },
        {
            id: 2,
            name: 'Balanced Route',
            type: 'balanced',
            duration: '12 min',
            distance: '2.8 km',
            safetyScore: 85,
            features: ['Moderate traffic', 'Some lighting', 'Mixed safety zones'],
            warnings: ['One construction zone'],
            icon: 'fas fa-balance-scale',
            color: 'warning'
        },
        {
            id: 3,
            name: 'Fastest Route',
            type: 'fastest',
            duration: '8 min',
            distance: '2.1 km',
            safetyScore: 70,
            features: ['Direct path', 'Less traffic'],
            warnings: ['Poorly lit section', 'Avoid after dark', 'Higher crime area'],
            icon: 'fas fa-tachometer-alt',
            color: 'danger'
        }
    ];
    
    // Filter routes based on preferences
    return baseRoutes.filter(route => {
        if (preferences.avoidDanger && route.safetyScore < 80) return false;
        if (preferences.preferWellLit && !route.features.some(f => f.includes('lit'))) return false;
        return true;
    }).map(route => ({
        ...route,
        destination: destination
    }));
}

function displayRouteOptions(routes, resultsElement, mapElement) {
    if (routes.length === 0) {
        resultsElement.innerHTML = `
            <div class="no-routes-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>No Safe Routes Found</h4>
                <p>Try adjusting your preferences or choose a different destination.</p>
            </div>
        `;
        return;
    }
    
    resultsElement.innerHTML = routes.map(route => `
        <div class="route-option enhanced ${route.color}" data-route-id="${route.id}">
            <div class="route-header">
                <div class="route-icon">
                    <i class="${route.icon}"></i>
                </div>
                <div class="route-basic-info">
                    <h4>${route.name} to ${route.destination}</h4>
                    <div class="route-stats">
                        <span class="stat">
                            <i class="fas fa-clock"></i> ${route.duration}
                        </span>
                        <span class="stat">
                            <i class="fas fa-route"></i> ${route.distance}
                        </span>
                        <span class="stat safety-score">
                            <i class="fas fa-shield-alt"></i> ${route.safetyScore}% Safe
                        </span>
                    </div>
                </div>
                <div class="route-actions">
                    <button class="action-btn primary" onclick="selectRoute(${route.id})">
                        <i class="fas fa-play"></i> Start
                    </button>
                    <button class="action-btn secondary" onclick="saveRoute(${route.id})">
                        <i class="fas fa-bookmark"></i>
                    </button>
                    <button class="action-btn secondary" onclick="shareRoute(${route.id})">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
            
            <div class="route-details">
                <div class="route-features">
                    <h5><i class="fas fa-check-circle"></i> Safety Features:</h5>
                    <ul class="features-list">
                        ${route.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                ${route.warnings.length > 0 ? `
                    <div class="route-warnings">
                        <h5><i class="fas fa-exclamation-triangle"></i> Warnings:</h5>
                        <ul class="warnings-list">
                            ${route.warnings.map(warning => `<li><i class="fas fa-exclamation"></i> ${warning}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="route-timeline">
                    <h5><i class="fas fa-list-ol"></i> Route Steps:</h5>
                    <div class="timeline-steps">
                        <div class="timeline-step">
                            <i class="fas fa-play-circle"></i>
                            <span>Start from current location</span>
                        </div>
                        <div class="timeline-step">
                            <i class="fas fa-route"></i>
                            <span>Follow ${route.name.toLowerCase()} path</span>
                        </div>
                        <div class="timeline-step">
                            <i class="fas fa-flag-checkered"></i>
                            <span>Arrive at ${route.destination}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Show map preview
    mapElement.style.display = 'block';
    
    // Add click handlers for route options
    routes.forEach(route => {
        const routeElement = resultsElement.querySelector(`[data-route-id="${route.id}"]`);
        if (routeElement) {
            routeElement.addEventListener('click', function(e) {
                if (!e.target.closest('.route-actions')) {
                    this.classList.toggle('expanded');
                }
            });
        }
    });
}

function selectRoute(routeId) {
    showNotification('Navigation started! Follow the highlighted path.', 'success');
    // Here you would integrate with actual navigation
}

function saveRoute(routeId) {
    showNotification('Route saved to your favorites!', 'success');
    // Add to saved routes
}

function shareRoute(routeId) {
    showNotification('Route link copied to clipboard!', 'info');
    // Share functionality
}

function initializeSavedRoutes() {
    const savedRoutesGrid = document.querySelector('#saved-routes-grid');
    if (!savedRoutesGrid) return;
    
    // Add click handlers for saved route actions
    savedRoutesGrid.addEventListener('click', function(e) {
        const actionBtn = e.target.closest('.action-btn');
        if (!actionBtn) return;
        
        const icon = actionBtn.querySelector('i');
        if (icon.classList.contains('fa-play')) {
            showNotification('Loading saved route...', 'info');
        } else if (icon.classList.contains('fa-edit')) {
            showNotification('Route editor opened', 'info');
        }
    });
}

function initializeRouteHistory() {
    const historyList = document.querySelector('#route-history-list');
    const clearBtn = document.querySelector('#clear-history');
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Clear all route history?')) {
                historyList.innerHTML = '<p class="empty-state">No recent routes</p>';
                showNotification('Route history cleared', 'info');
            }
        });
    }
    
    if (historyList) {
        historyList.addEventListener('click', function(e) {
            const actionBtn = e.target.closest('.action-btn');
            if (!actionBtn) return;
            
            const icon = actionBtn.querySelector('i');
            const historyItem = actionBtn.closest('.history-item');
            const routeText = historyItem.querySelector('.history-route').textContent;
            
            if (icon.classList.contains('fa-redo')) {
                const destination = routeText.split(' → ')[1];
                document.querySelector('#route-to').value = destination;
                showNotification(`Route loaded: ${routeText}`, 'success');
            } else if (icon.classList.contains('fa-bookmark')) {
                showNotification(`Route saved: ${routeText}`, 'success');
            }
        });
    }
}

function addToRouteHistory(destination) {
    const historyList = document.querySelector('#route-history-list');
    if (!historyList) return;
    
    const newItem = document.createElement('div');
    newItem.className = 'history-item';
    newItem.innerHTML = `
        <div class="history-info">
            <span class="history-route">Current Location → ${destination}</span>
            <span class="history-time">Just now</span>
        </div>
        <div class="history-actions">
            <button class="action-btn" title="Use again">
                <i class="fas fa-redo"></i>
            </button>
            <button class="action-btn" title="Save route">
                <i class="fas fa-bookmark"></i>
            </button>
        </div>
    `;
    
    // Remove empty state if exists
    const emptyState = historyList.querySelector('.empty-state');
    if (emptyState) emptyState.remove();
    
    // Add to top of list
    historyList.insertBefore(newItem, historyList.firstChild);
    
    // Limit to 10 items
    const items = historyList.querySelectorAll('.history-item');
    if (items.length > 10) {
        items[items.length - 1].remove();
    }
}

// Old community panel function removed - now handled by community.js

// Notification System
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
                box-shadow: var(--shadow-lg);
                animation: slideInRight 0.3s ease;
            }
            
            .notification.success {
                background: #10b981;
                color: white;
            }
            
            .notification.info {
                background: #3b82f6;
                color: white;
            }
            
            .notification.emergency {
                background: #ef4444;
                color: white;
                animation: shake 0.5s ease-in-out;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            
            .notification button {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.7;
            }
            
            .notification button:hover {
                opacity: 1;
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
// Happy & Delightful Interactive Effects

// Add scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll progress bar
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    // Update scroll progress
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
    
    initializeHappyEffects();
});

function initializeHappyEffects() {
    addSectionRevealAnimations();
    addHappyButtonEffects();
    addDelightfulHoverEffects();
    addJoyfulClickEffects();
    addCheerfulFormEffects();
    addPlayfulCursorEffects();
    addHappyLoadingStates();
    addCelebrationEffects();
}

// Section reveal animations on scroll
function addSectionRevealAnimations() {
    const sections = document.querySelectorAll('section, .feature-card, .testimonial-card, .step');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-reveal', 'revealed');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('testimonial-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = delay + 'ms';
                }
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add('section-reveal');
        revealObserver.observe(section);
    });
}

// Happy button effects
function addHappyButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn, .demo-btn, .auth-btn');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Add success bounce effect
        button.addEventListener('animationend', function() {
            if (this.classList.contains('success-bounce')) {
                this.classList.remove('success-bounce');
            }
        });
    });
    
    // Add ripple animation CSS
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Delightful hover effects
function addDelightfulHoverEffects() {
    // Add tilt effect to cards
    const cards = document.querySelectorAll('.feature-card, .testimonial-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Joyful click effects
function addJoyfulClickEffects() {
    // Add bounce effect to interactive elements
    const interactiveElements = document.querySelectorAll('.quick-action-btn, .zone-btn, .action-btn, .call-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'iconBounce 0.6s ease';
            }, 10);
        });
    });
}

// Cheerful form effects
function addCheerfulFormEffects() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            createSparkles(this);
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add typing animation
        input.addEventListener('input', function() {
            this.style.borderColor = '#6366f1';
            setTimeout(() => {
                this.style.borderColor = '';
            }, 300);
        });
    });
}

// Create sparkle effect
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #6366f1;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: sparkleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
    
    // Add sparkle animation if not exists
    if (!document.querySelector('#sparkle-styles')) {
        const style = document.createElement('style');
        style.id = 'sparkle-styles';
        style.textContent = `
            @keyframes sparkleFloat {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(0);
                }
                50% {
                    opacity: 1;
                    transform: translateY(-20px) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-40px) scale(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Playful cursor effects
function addPlayfulCursorEffects() {
    // Add custom cursor trail
    const cursorTrail = [];
    const trailLength = 8;
    
    // Create cursor trail elements
    for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: rgba(99, 102, 241, ${0.8 - i * 0.1});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(trail);
        cursorTrail.push(trail);
    }
    
    // Update cursor trail position
    document.addEventListener('mousemove', function(e) {
        cursorTrail.forEach((trail, index) => {
            setTimeout(() => {
                trail.style.left = (e.clientX - 4) + 'px';
                trail.style.top = (e.clientY - 4) + 'px';
            }, index * 20);
        });
    });
}

// Happy loading states
function addHappyLoadingStates() {
    // Override existing loading functions to add happy effects
    const originalLogin = window.login;
    const originalRegister = window.register;
    
    if (originalLogin) {
        window.login = async function(...args) {
            const result = await originalLogin.apply(this, args);
            if (result !== false) {
                createCelebration();
            }
            return result;
        };
    }
    
    if (originalRegister) {
        window.register = async function(...args) {
            const result = await originalRegister.apply(this, args);
            if (result !== false) {
                createCelebration();
            }
            return result;
        };
    }
}

// Celebration effects
function addCelebrationEffects() {
    // Add to existing success notifications
    const originalShowNotification = window.showNotification;
    
    if (originalShowNotification) {
        window.showNotification = function(message, type) {
            const result = originalShowNotification.apply(this, arguments);
            
            if (type === 'success') {
                createCelebration();
            }
            
            return result;
        };
    }
}

// Create celebration animation
function createCelebration() {
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * window.innerWidth}px;
            top: -10px;
            z-index: 10000;
            pointer-events: none;
            animation: confettiFall ${2 + Math.random() * 3}s ease-out forwards;
        `;
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
    
    // Add confetti animation
    if (!document.querySelector('#confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add happy sound effects (optional - can be enabled)
function addHappySounds() {
    // Create audio context for sound effects
    let audioContext;
    
    function playHappySound(frequency = 800, duration = 200) {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }
    
    // Add sound to button clicks (uncomment to enable)
    // document.addEventListener('click', function(e) {
    //     if (e.target.matches('.btn-primary, .cta-btn')) {
    //         playHappySound(600, 150);
    //     }
    // });
}

// Initialize happy sounds (commented out by default)
// addHappySounds();

// Add Easter egg - Konami code for extra happiness
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s ease-in-out infinite';
        createCelebration();
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
        
        // Add rainbow animation
        if (!document.querySelector('#rainbow-styles')) {
            const style = document.createElement('style');
            style.id = 'rainbow-styles';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        konamiCode = [];
    }
});

// Add motivational messages
const motivationalMessages = [
    "You're doing great! 🌟",
    "Safety first, happiness always! 😊",
    "Your journey matters! 🚀",
    "Stay safe, stay happy! 💙",
    "You're protected with Rakshita! 🛡️"
];

function showMotivationalMessage() {
    const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    
    const messageEl = document.createElement('div');
    messageEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-weight: 600;
        z-index: 10001;
        animation: motivationPop 3s ease-in-out forwards;
        pointer-events: none;
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    `;
    messageEl.textContent = message;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => messageEl.remove(), 3000);
    
    // Add motivation animation
    if (!document.querySelector('#motivation-styles')) {
        const style = document.createElement('style');
        style.id = 'motivation-styles';
        style.textContent = `
            @keyframes motivationPop {
                0% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.5);
                }
                20% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1.1);
                }
                80% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Show motivational message occasionally
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every interval
        showMotivationalMessage();
    }
}, 30000); // Check every 30 seconds
// Enhanced Location Functions

// Enhanced address resolution with multiple fallback services
async function getRealAddress(latitude, longitude) {
    console.log(`🔍 Getting address for: ${latitude}, ${longitude}`);
    
    // Try Enhanced Location Manager first if available
    if (window.enhancedLocationManager && window.enhancedLocationManager.isAvailable()) {
        try {
            console.log('🚀 Using Enhanced Location Manager for address lookup');
            const address = await window.enhancedLocationManager.getReliableAddress(latitude, longitude);
            if (address) {
                console.log(`✅ Enhanced geocoding success: ${address}`);
                return address;
            }
        } catch (error) {
            console.warn('⚠️ Enhanced geocoding failed, trying fallback services:', error);
        }
    }
    
    // Fallback to other geocoding services
    console.log('📍 Using fallback geocoding services');
    
    // Using more reliable geocoding services
    const services = [
        // OpenCage Geocoding API (very reliable, free tier available)
        {
            name: 'OpenCage',
            url: `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=demo&language=en&pretty=1`,
            parser: (data) => {
                if (data && data.results && data.results.length > 0) {
                    const result = data.results[0];
                    if (result.formatted) {
                        return result.formatted;
                    }
                }
                return null;
            }
        },
        // MapBox Geocoding (very reliable)
        {
            name: 'MapBox',
            url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`,
            parser: (data) => {
                if (data && data.features && data.features.length > 0) {
                    const feature = data.features[0];
                    if (feature.place_name) {
                        return feature.place_name;
                    }
                }
                return null;
            }
        },
        // LocationIQ (reliable alternative)
        {
            name: 'LocationIQ',
            url: `https://us1.locationiq.com/v1/reverse.php?key=demo&lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            parser: (data) => {
                if (data && data.display_name) {
                    return data.display_name;
                }
                return null;
            }
        },
        // Positionstack (reliable geocoding service)
        {
            name: 'Positionstack',
            url: `http://api.positionstack.com/v1/reverse?access_key=demo&query=${latitude},${longitude}&limit=1`,
            parser: (data) => {
                if (data && data.data && data.data.length > 0) {
                    const result = data.data[0];
                    if (result.label) {
                        return result.label;
                    }
                }
                return null;
            }
        },
        // BigDataCloud (fallback)
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
            console.log(`📡 Trying ${service.name} geocoding service...`);
            
            // Create timeout controller
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                console.log(`⏰ ${service.name} timeout after 10 seconds`);
                controller.abort();
            }, 10000); // 10 second timeout for better reliability
            
            const response = await fetch(service.url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Rakshita-Safety-App/2.0',
                    'Referer': 'https://rakshita-safety.web.app'
                },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            console.log(`📥 ${service.name} response: ${response.status} ${response.statusText}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log(`📊 ${service.name} data:`, data);
            
            const address = service.parser(data);
            
            if (address && address.trim()) {
                console.log(`✅ Address found by ${service.name}: ${address}`);
                return address;
            } else {
                console.log(`❌ ${service.name} returned no usable address`);
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
    
    // All services failed
    console.log('❌ All geocoding services failed');
    throw new Error('Address lookup failed - all services unavailable');
}

// Try browser's built-in geocoding (experimental)
async function tryBrowserGeocoding(latitude, longitude) {
    // This is a fallback that tries to use any available browser geocoding
    // Most browsers don't have reverse geocoding, but some mobile browsers might
    return new Promise((resolve, reject) => {
        // Try to use any available geocoding API
        if (window.google && window.google.maps && window.google.maps.Geocoder) {
            const geocoder = new window.google.maps.Geocoder();
            const latlng = { lat: latitude, lng: longitude };
            
            geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    resolve(results[0].formatted_address);
                } else {
                    reject(new Error('Google geocoding failed'));
                }
            });
        } else {
            reject(new Error('No browser geocoding available'));
        }
    });
}

// Enhanced updateLocationDisplay with better error handling
async function updateLocationDisplay() {
    if (!currentLocation) {
        console.log('No current location available');
        return;
    }
    
    console.log('Updating location display for:', currentLocation);
    
    // Update coordinates immediately
    const coordsDisplay = document.getElementById('coords-display');
    if (coordsDisplay) {
        coordsDisplay.textContent = `${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}`;
        coordsDisplay.style.color = 'inherit';
    }
    
    // Update accuracy
    const accuracyDisplay = document.getElementById('accuracy-display');
    if (accuracyDisplay) {
        const accuracy = Math.round(currentLocation.accuracy || 0);
        accuracyDisplay.textContent = `±${accuracy}m`;
        
        // Color code accuracy
        if (accuracy <= 10) {
            accuracyDisplay.style.color = '#10b981'; // Green - excellent
        } else if (accuracy <= 50) {
            accuracyDisplay.style.color = '#f59e0b'; // Yellow - good
        } else {
            accuracyDisplay.style.color = '#ef4444'; // Red - poor
        }
    }
    
    // Update address with loading state
    const addressDisplay = document.getElementById('address-display');
    if (addressDisplay) {
        addressDisplay.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resolving address...';
        addressDisplay.style.color = '#6b7280';
        
        try {
            debugLog('Starting address resolution...');
            const address = await getRealAddress(currentLocation.latitude, currentLocation.longitude);
            
            if (address) {
                addressDisplay.textContent = address;
                addressDisplay.style.color = 'inherit';
                debugLog('✅ Address updated successfully: ' + address, 'success');
            } else {
                throw new Error('Empty address returned');
            }
            
        } catch (error) {
            debugLog('❌ Address resolution failed: ' + error.message, 'error');
            
            // Show fallback address with helpful message
            const fallbackAddress = `Coordinates: ${currentLocation.latitude.toFixed(4)}, ${currentLocation.longitude.toFixed(4)}`;
            addressDisplay.innerHTML = `
                <div style="color: #f59e0b;">${fallbackAddress}</div>
                <small style="color: #6b7280; display: block; margin-top: 4px;">
                    Address lookup failed - click "Test Address" or "Set Address" buttons below
                </small>
            `;
            
            // Show user-friendly error with suggestions
            showNotification('Address lookup failed. Try the "Test Address" button or set manually.', 'warning');
        }
    }
}

// Enhanced location refresh with better feedback
async function refreshCurrentLocation() {
    const refreshBtn = document.getElementById('refresh-location');
    
    try {
        console.log('Refreshing location...');
        
        // Update button state
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            refreshBtn.disabled = true;
        }
        
        // Check if geolocation is available
        if (!navigator.geolocation) {
            throw new Error('Geolocation is not supported by this browser');
        }
        
        // Get fresh location with high accuracy
        const position = await new Promise((resolve, reject) => {
            const options = {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0 // Force fresh location
            };
            
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
        
        // Update current location
        currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString()
        };
        
        console.log('✅ Location refreshed:', currentLocation);
        
        // Update displays
        await updateLocationDisplay();
        updateCurrentZoneStatus();
        
        showNotification('Location updated successfully!', 'success');
        
    } catch (error) {
        console.error('❌ Location refresh failed:', error);
        
        let errorMessage = 'Failed to refresh location';
        
        if (error.code === 1) {
            errorMessage = 'Location access denied. Please enable location permissions.';
        } else if (error.code === 2) {
            errorMessage = 'Location unavailable. Please check your GPS settings.';
        } else if (error.code === 3) {
            errorMessage = 'Location request timed out. Please try again.';
        }
        
        showNotification(errorMessage, 'error');
        
    } finally {
        // Reset button state
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
            refreshBtn.disabled = false;
        }
    }
}

// Test geocoding function for debugging
async function testGeocoding() {
    debugLog('🧪 Testing geocoding services...');
    
    let testLat, testLng;
    
    if (currentLocation) {
        testLat = currentLocation.latitude;
        testLng = currentLocation.longitude;
        debugLog(`Using current location: ${testLat}, ${testLng}`);
    } else {
        // Test coordinates (New Delhi, India)
        testLat = 28.6139;
        testLng = 77.2090;
        debugLog(`Using test coordinates: ${testLat}, ${testLng}`);
    }
    
    try {
        const address = await getRealAddress(testLat, testLng);
        debugLog('✅ Geocoding test successful: ' + address, 'success');
        showNotification(`Address found: ${address}`, 'success');
        
        // Update address display if testing current location
        if (currentLocation) {
            const addressDisplay = document.getElementById('address-display');
            if (addressDisplay) {
                addressDisplay.textContent = address;
                addressDisplay.style.color = 'inherit';
            }
        }
        
    } catch (error) {
        debugLog('❌ Geocoding test failed: ' + error.message, 'error');
        showNotification('Address lookup failed: ' + error.message, 'error');
    }
}

// Manual address override
function setManualAddress() {
    const address = prompt('Enter address manually:');
    if (address && address.trim()) {
        const addressDisplay = document.getElementById('address-display');
        if (addressDisplay) {
            addressDisplay.textContent = address.trim();
            addressDisplay.style.color = 'inherit';
        }
        showNotification('Address set manually', 'success');
        debugLog('Address set manually: ' + address.trim());
    }
}

// Add manual address button
function addManualAddressButton() {
    if (document.getElementById('manual-address-btn')) return;
    
    const manualBtn = document.createElement('button');
    manualBtn.id = 'manual-address-btn';
    manualBtn.textContent = '✏️ Set Address';
    manualBtn.className = 'btn-secondary';
    manualBtn.style.margin = '10px';
    manualBtn.onclick = setManualAddress;
    
    const locationActions = document.querySelector('.location-actions');
    if (locationActions) {
        locationActions.appendChild(manualBtn);
    }
}

// Add test button for debugging (temporary)
function addGeocodingTestButton() {
    // Only add if not already present
    if (document.getElementById('geocoding-test-btn')) return;
    
    const testBtn = document.createElement('button');
    testBtn.id = 'geocoding-test-btn';
    testBtn.textContent = '🧪 Test Address';
    testBtn.className = 'btn-secondary';
    testBtn.style.margin = '10px';
    testBtn.onclick = testGeocoding;
    
    const locationActions = document.querySelector('.location-actions');
    if (locationActions) {
        locationActions.appendChild(testBtn);
    }
}

// Add debug console for geocoding
function addDebugConsole() {
    if (document.getElementById('debug-console')) return;
    
    const debugConsole = document.createElement('div');
    debugConsole.id = 'debug-console';
    debugConsole.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 300px;
        max-height: 200px;
        background: #1f2937;
        color: #f3f4f6;
        border-radius: 8px;
        padding: 10px;
        font-family: monospace;
        font-size: 12px;
        overflow-y: auto;
        z-index: 5000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: none;
    `;
    
    debugConsole.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <strong>Debug Console</strong>
            <button onclick="this.parentElement.parentElement.style.display='none'" style="background: none; border: none; color: #f3f4f6; cursor: pointer;">×</button>
        </div>
        <div id="debug-log"></div>
    `;
    
    document.body.appendChild(debugConsole);
    
    // Add toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = '🐛 Debug';
    toggleBtn.className = 'btn-secondary';
    toggleBtn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 5001;';
    toggleBtn.onclick = () => {
        debugConsole.style.display = debugConsole.style.display === 'none' ? 'block' : 'none';
    };
    
    document.body.appendChild(toggleBtn);
}

// Enhanced debug logging
function debugLog(message, type = 'info') {
    console.log(message);
    
    const debugLogEl = document.getElementById('debug-log');
    if (debugLogEl) {
        const timestamp = new Date().toLocaleTimeString();
        const color = type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#6b7280';
        
        debugLogEl.innerHTML += `<div style="color: ${color}; margin-bottom: 5px;">[${timestamp}] ${message}</div>`;
        debugLogEl.scrollTop = debugLogEl.scrollHeight;
    }
}

// Handle location errors with user-friendly messages
function handleLocationError(error) {
    const coordsElement = document.getElementById('current-coords');
    const addressElement = document.getElementById('current-address');
    const statusElement = document.getElementById('location-status');
    
    let errorMessage = '';
    let fallbackCoords = '';
    
    switch(error.code) {
        case 1: // PERMISSION_DENIED
            errorMessage = 'Location access denied by user';
            fallbackCoords = 'Location permission required';
            showLocationPermissionHelp();
            break;
        case 2: // POSITION_UNAVAILABLE
            errorMessage = 'Location information unavailable';
            fallbackCoords = 'Unable to determine location';
            break;
        case 3: // TIMEOUT
            errorMessage = 'Location request timed out';
            fallbackCoords = 'Location request timeout';
            break;
        default:
            errorMessage = 'Geolocation not supported';
            fallbackCoords = 'Geolocation not available';
            break;
    }
    
    if (coordsElement) {
        coordsElement.textContent = fallbackCoords;
        coordsElement.style.color = '#f59e0b';
    }
    
    if (addressElement) {
        addressElement.textContent = 'Enable location access for accurate tracking';
        addressElement.style.color = '#f59e0b';
    }
    
    if (statusElement) {
        statusElement.textContent = errorMessage;
        statusElement.style.color = '#ef4444';
    }
    
    // Show helpful notification
    showNotification('Please enable location access for accurate safety tracking', 'warning');
}

// Show location permission help
function showLocationPermissionHelp() {
    const helpModal = document.createElement('div');
    helpModal.className = 'location-help-modal';
    helpModal.innerHTML = `
        <div class="location-help-content">
            <h3>📍 Enable Location Access</h3>
            <p>Rakshita needs location access to provide safety features:</p>
            <ul>
                <li>🛡️ Real-time safety monitoring</li>
                <li>🚨 Emergency location sharing</li>
                <li>📍 Accurate safety zone alerts</li>
                <li>🗺️ Safe route recommendations</li>
            </ul>
            <div class="help-steps">
                <h4>How to enable:</h4>
                <ol>
                    <li>Click the location icon 📍 in your browser's address bar</li>
                    <li>Select "Allow" for location access</li>
                    <li>Refresh the page if needed</li>
                </ol>
            </div>
            <div class="help-buttons">
                <button onclick="requestLocationPermission()" class="btn-primary">Try Again</button>
                <button onclick="closeLocationHelp()" class="btn-secondary">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(helpModal);
    
    // Add styles for the help modal
    if (!document.querySelector('#location-help-styles')) {
        const style = document.createElement('style');
        style.id = 'location-help-styles';
        style.textContent = `
            .location-help-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                backdrop-filter: blur(5px);
            }
            
            .location-help-content {
                background: white;
                padding: 2rem;
                border-radius: 20px;
                max-width: 500px;
                margin: 1rem;
                box-shadow: var(--shadow-xl);
                animation: modalBounceIn 0.5s ease;
            }
            
            .location-help-content h3 {
                margin: 0 0 1rem 0;
                color: var(--primary-color);
            }
            
            .location-help-content ul {
                margin: 1rem 0;
                padding-left: 1.5rem;
            }
            
            .location-help-content li {
                margin: 0.5rem 0;
                color: var(--text-secondary);
            }
            
            .help-steps {
                background: var(--light-surface);
                padding: 1rem;
                border-radius: 10px;
                margin: 1rem 0;
            }
            
            .help-steps h4 {
                margin: 0 0 0.5rem 0;
                color: var(--text-primary);
            }
            
            .help-steps ol {
                margin: 0;
                padding-left: 1.5rem;
            }
            
            .help-buttons {
                display: flex;
                gap: 1rem;
                margin-top: 1.5rem;
            }
            
            .help-buttons button {
                flex: 1;
                padding: 0.75rem;
                border: none;
                border-radius: 10px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// Close location help modal
function closeLocationHelp() {
    const modal = document.querySelector('.location-help-modal');
    if (modal) {
        modal.remove();
    }
}

// Update location status based on accuracy
function updateLocationStatus(accuracy) {
    const statusElement = document.getElementById('location-status');
    if (!statusElement) return;
    
    let status = '';
    let color = '';
    
    if (accuracy <= 10) {
        status = 'High Accuracy GPS Active';
        color = '#10b981';
    } else if (accuracy <= 50) {
        status = 'Good Accuracy GPS Active';
        color = '#06b6d4';
    } else if (accuracy <= 100) {
        status = 'Moderate Accuracy GPS Active';
        color = '#f59e0b';
    } else {
        status = 'Low Accuracy GPS Active';
        color = '#ef4444';
    }
    
    statusElement.textContent = status;
    statusElement.style.color = color;
}

// Request location permission explicitly
async function requestLocationPermission() {
    closeLocationHelp();
    
    try {
        // Check if permissions API is available
        if ('permissions' in navigator) {
            const permission = await navigator.permissions.query({name: 'geolocation'});
            
            if (permission.state === 'denied') {
                showNotification('Location access is blocked. Please enable it in your browser settings.', 'error');
                return false;
            }
        }
        
        // Request location access
        navigator.geolocation.getCurrentPosition(
            (position) => {
                showNotification('Location access granted! Tracking activated.', 'success');
                updateLocationData();
            },
            (error) => {
                handleLocationError(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
        
        return true;
    } catch (error) {
        console.log('Permission API not supported, using direct geolocation');
        updateLocationData();
        return true;
    }
}

// Safety Zone Management System
let safetyZones = [];
let currentLocation = null;
let locationWatchId = null;
let alertSettings = {
    enableZoneAlerts: true,
    enableDangerAlerts: true,
    enableSafeAlerts: false,
    enableSoundAlerts: true,
    alertRadius: 500
};

function initializeSafetyZoneManagement() {
    console.log('🛡️ Initializing Safety Zone Management...');
    
    // Load saved zones and settings
    loadSafetyZones();
    loadAlertSettings();
    
    // Setup tab switching
    setupZoneTabs();
    
    // Setup location controls
    setupLocationControls();
    
    // Setup zone management
    setupZoneManagement();
    
    // Setup alert settings
    setupAlertSettings();
    
    // Load default safety zones if none exist
    loadDefaultSafetyZones();
    
    // Try to get location automatically if permission already granted
    tryAutoLocationDetection();
    
    console.log('✅ Safety Zone Management initialized');
}

// Try to automatically detect location if permission is already granted
async function tryAutoLocationDetection() {
    try {
        // Check if we can get location without prompting
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 300000 // 5 minutes cache
                }
            );
        });
        
        console.log('🎯 Auto-detected location:', position.coords);
        
        currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString()
        };
        
        // Update displays
        await updateLocationDisplay();
        updateCurrentZoneStatus();
        
        // Start tracking
        startLocationTracking();
        
        // Update enable button
        const enableBtn = document.getElementById('enable-location');
        if (enableBtn) {
            enableBtn.innerHTML = '<i class="fas fa-check"></i> Location Active';
            enableBtn.style.background = '#10b981';
        }
        
        // Add test button
        addGeocodingTestButton();
        
        // Add manual address button
        addManualAddressButton();
        
        showNotification('Location detected automatically!', 'success');
        
    } catch (error) {
        console.log('ℹ️ Auto location detection failed (normal if permission not granted):', error.message);
        
        // Update UI to show location is needed
        const coordsDisplay = document.getElementById('coords-display');
        const addressDisplay = document.getElementById('address-display');
        
        if (coordsDisplay) {
            coordsDisplay.textContent = 'Location not enabled';
            coordsDisplay.style.color = '#f59e0b';
        }
        
        if (addressDisplay) {
            addressDisplay.textContent = 'Click "Enable Location" to get your address';
            addressDisplay.style.color = '#6b7280';
        }
    }
}

function setupZoneTabs() {
    const zoneTabs = document.querySelectorAll('.zone-tab');
    
    zoneTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.zoneTab;
            switchZoneTab(targetTab);
        });
    });
}

function switchZoneTab(tabName) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.zone-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.zone-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to selected tab and content
    document.querySelector(`[data-zone-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-zone-tab`).classList.add('active');
    
    // Load content based on tab
    if (tabName === 'current') {
        updateCurrentZoneStatus();
    } else if (tabName === 'manage') {
        loadUserZones();
    }
}

function setupLocationControls() {
    // Refresh location button
    const refreshBtn = document.getElementById('refresh-location');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            refreshCurrentLocation();
        });
    }
    
    // Enable location button
    const enableBtn = document.getElementById('enable-location');
    if (enableBtn) {
        enableBtn.addEventListener('click', requestLocationPermission);
    }
    
    // Manual location button
    const manualBtn = document.getElementById('manual-location');
    if (manualBtn) {
        manualBtn.addEventListener('click', openManualLocationDialog);
    }
}

async function requestLocationPermission() {
    const enableBtn = document.getElementById('enable-location');
    
    try {
        console.log('🔍 Requesting location permission...');
        
        // Check if geolocation is supported
        if (!navigator.geolocation) {
            throw new Error('Geolocation is not supported by this browser');
        }
        
        // Update button state
        if (enableBtn) {
            enableBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Requesting...';
            enableBtn.disabled = true;
        }
        
        // Request permission with high accuracy
        const position = await new Promise((resolve, reject) => {
            const options = {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            };
            
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
        
        // Success - update location
        currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString()
        };
        
        console.log('✅ Location permission granted:', currentLocation);
        
        // Update displays
        await updateLocationDisplay();
        updateCurrentZoneStatus();
        
        // Start continuous tracking
        startLocationTracking();
        
        showNotification('Location access granted! Safety zone monitoring active.', 'success');
        
        // Update button
        if (enableBtn) {
            enableBtn.innerHTML = '<i class="fas fa-check"></i> Location Enabled';
            enableBtn.style.background = '#10b981';
            enableBtn.disabled = false;
        }
        
        // Add test button
        addGeocodingTestButton();
        
        // Add manual address button
        addManualAddressButton();
        
        // Add debug console for troubleshooting
        addDebugConsole();
        
        debugLog('Location permission granted successfully', 'success');
        
    } catch (error) {
        console.error('❌ Location permission error:', error);
        
        let errorMessage = 'Failed to get location';
        
        if (error.code === 1) {
            errorMessage = 'Location access denied. Please enable location permissions in your browser.';
        } else if (error.code === 2) {
            errorMessage = 'Location unavailable. Please check your GPS settings.';
        } else if (error.code === 3) {
            errorMessage = 'Location request timed out. Please try again.';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        showNotification(errorMessage, 'error');
        handleLocationError(error);
        
        // Reset button
        if (enableBtn) {
            enableBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Enable Location';
            enableBtn.disabled = false;
            enableBtn.style.background = '';
        }
    }
}

async function refreshCurrentLocation() {
    const refreshBtn = document.getElementById('refresh-location');
    
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0 // Force fresh location
                }
            );
        });
        
        currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString()
        };
        
        await updateLocationDisplay();
        updateCurrentZoneStatus();
        
        showNotification('Location updated successfully!', 'success');
        
    } catch (error) {
        console.error('Location refresh error:', error);
        showNotification('Failed to refresh location: ' + error.message, 'error');
    } finally {
        refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
    }
}

async function updateLocationDisplay() {
    if (!currentLocation) return;
    
    // Update coordinates
    const coordsDisplay = document.getElementById('coords-display');
    if (coordsDisplay) {
        coordsDisplay.textContent = `${currentLocation.latitude.toFixed(6)}, ${currentLocation.longitude.toFixed(6)}`;
    }
    
    // Update accuracy
    const accuracyDisplay = document.getElementById('accuracy-display');
    if (accuracyDisplay) {
        const accuracy = Math.round(currentLocation.accuracy);
        accuracyDisplay.textContent = `±${accuracy}m`;
        
        // Color code accuracy
        if (accuracy <= 10) {
            accuracyDisplay.style.color = '#10b981'; // Green - excellent
        } else if (accuracy <= 50) {
            accuracyDisplay.style.color = '#f59e0b'; // Yellow - good
        } else {
            accuracyDisplay.style.color = '#ef4444'; // Red - poor
        }
    }
    
    // Update address
    const addressDisplay = document.getElementById('address-display');
    if (addressDisplay) {
        addressDisplay.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Resolving...';
        
        try {
            const address = await getRealAddress(currentLocation.latitude, currentLocation.longitude);
            addressDisplay.textContent = address;
        } catch (error) {
            addressDisplay.textContent = 'Address not available';
            addressDisplay.style.color = '#6b7280';
        }
    }
}

function startLocationTracking() {
    if (!navigator.geolocation || locationWatchId) {
        console.log('Location tracking already active or not supported');
        return;
    }
    
    console.log('🎯 Starting continuous location tracking...');
    
    const options = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 60000 // Update every minute
    };
    
    locationWatchId = navigator.geolocation.watchPosition(
        async (position) => {
            const newLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                timestamp: new Date().toISOString()
            };
            
            console.log('📍 Location update:', newLocation);
            
            // Check if location changed significantly (more than 10 meters)
            if (currentLocation && calculateDistance(currentLocation, newLocation) < 10) {
                console.log('⏭️ Skipping minor location change');
                return;
            }
            
            currentLocation = newLocation;
            
            // Update displays
            await updateLocationDisplay();
            updateCurrentZoneStatus();
            
            // Check for zone alerts
            checkZoneAlerts(newLocation);
            
            // Save location
            saveLocationData(newLocation);
            
        },
        (error) => {
            console.error('❌ Location tracking error:', error);
            handleLocationError(error);
        },
        options
    );
    
    console.log('✅ Location tracking started with watch ID:', locationWatchId);
}

function stopLocationTracking() {
    if (locationWatchId) {
        navigator.geolocation.clearWatch(locationWatchId);
        locationWatchId = null;
    }
}

function updateCurrentZoneStatus() {
    if (!currentLocation) {
        updateZoneIndicator('unknown', 'Location Required', 'Enable location to check safety zones');
        return;
    }
    
    // Find current zone
    const currentZone = findCurrentZone(currentLocation);
    
    if (currentZone) {
        updateZoneIndicator(
            currentZone.type,
            `${currentZone.name}`,
            currentZone.description
        );
    } else {
        // Analyze area safety based on nearby zones
        const nearbyZones = findNearbyZones(currentLocation, 1000); // 1km radius
        const safetyLevel = analyzeSafetyLevel(nearbyZones);
        
        updateZoneIndicator(
            safetyLevel.type,
            safetyLevel.title,
            safetyLevel.description
        );
    }
    
    // Update nearby zones
    updateNearbyZonesList();
}

function updateZoneIndicator(type, title, description) {
    const indicator = document.getElementById('zone-indicator');
    const titleEl = document.getElementById('zone-status-title');
    const descEl = document.getElementById('zone-status-description');
    const levelEl = document.getElementById('zone-level');
    
    if (!indicator) return;
    
    // Remove existing classes
    indicator.classList.remove('safe', 'warning', 'danger');
    
    // Add new class
    indicator.classList.add(type);
    
    // Update content
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = description;
    
    // Update level indicator
    if (levelEl) {
        const levelIndicator = levelEl.querySelector('.level-indicator');
        if (levelIndicator) {
            const levels = {
                safe: '✓',
                warning: '!',
                danger: '⚠',
                unknown: '?'
            };
            levelIndicator.textContent = levels[type] || '?';
        }
    }
}

function updateNearbyZonesList() {
    const zonesList = document.getElementById('zones-list');
    if (!zonesList || !currentLocation) return;
    
    const nearbyZones = findNearbyZones(currentLocation, 2000); // 2km radius
    
    if (nearbyZones.length === 0) {
        zonesList.innerHTML = `
            <div class="empty-zones">
                <i class="fas fa-map-marker-alt"></i>
                <p>No safety zones found nearby</p>
            </div>
        `;
        return;
    }
    
    zonesList.innerHTML = nearbyZones.map(zone => {
        const distance = Math.round(calculateDistance(currentLocation, zone));
        return `
            <div class="zone-item">
                <div class="zone-item-info">
                    <div class="zone-item-icon ${zone.type}">
                        <i class="fas fa-${getZoneIcon(zone.type)}"></i>
                    </div>
                    <div class="zone-item-details">
                        <h6>${zone.name}</h6>
                        <p>${zone.description}</p>
                    </div>
                </div>
                <div class="zone-distance">${distance}m</div>
            </div>
        `;
    }).join('');
}

function findCurrentZone(location) {
    return safetyZones.find(zone => {
        const distance = calculateDistance(location, zone);
        return distance <= zone.radius;
    });
}

function findNearbyZones(location, radius) {
    return safetyZones
        .map(zone => ({
            ...zone,
            distance: calculateDistance(location, zone)
        }))
        .filter(zone => zone.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
}

function analyzeSafetyLevel(nearbyZones) {
    if (nearbyZones.length === 0) {
        return {
            type: 'warning',
            title: 'Unknown Area',
            description: 'No safety data available for this area'
        };
    }
    
    const dangerZones = nearbyZones.filter(z => z.type === 'danger');
    const safeZones = nearbyZones.filter(z => z.type === 'safe');
    
    if (dangerZones.length > 0) {
        const closest = dangerZones[0];
        return {
            type: 'warning',
            title: 'Caution Advised',
            description: `${closest.distance}m from ${closest.name}`
        };
    }
    
    if (safeZones.length > 0) {
        const closest = safeZones[0];
        return {
            type: 'safe',
            title: 'Safe Area',
            description: `Near ${closest.name} (${closest.distance}m)`
        };
    }
    
    return {
        type: 'warning',
        title: 'Moderate Area',
        description: 'Exercise normal caution'
    };
}

function checkZoneAlerts(location) {
    if (!alertSettings.enableZoneAlerts) return;
    
    const currentZone = findCurrentZone(location);
    const nearbyDangerZones = findNearbyZones(location, alertSettings.alertRadius)
        .filter(zone => zone.type === 'danger');
    
    // Alert for entering danger zone
    if (currentZone && currentZone.type === 'danger' && alertSettings.enableDangerAlerts) {
        showZoneAlert('danger', `⚠️ DANGER ZONE: ${currentZone.name}`, currentZone.description);
    }
    
    // Alert for nearby danger zones
    if (nearbyDangerZones.length > 0 && alertSettings.enableDangerAlerts) {
        const closest = nearbyDangerZones[0];
        if (closest.distance <= alertSettings.alertRadius) {
            showZoneAlert('warning', `⚠️ Approaching: ${closest.name}`, `${Math.round(closest.distance)}m away`);
        }
    }
    
    // Alert for entering safe zone
    if (currentZone && currentZone.type === 'safe' && alertSettings.enableSafeAlerts) {
        showZoneAlert('safe', `✅ Safe Zone: ${currentZone.name}`, currentZone.description);
    }
}

function showZoneAlert(type, title, message) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `zone-alert ${type}`;
    alert.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
                <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem;">${title}</h4>
                <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 1.2rem; cursor: pointer; padding: 0; margin-left: 1rem;">×</button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Play sound if enabled
    if (alertSettings.enableSoundAlerts) {
        playAlertSound(type);
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

function playAlertSound(type) {
    // Create audio context for sound alerts
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Different frequencies for different alert types
        const frequencies = {
            safe: 800,
            warning: 600,
            danger: 400
        };
        
        oscillator.frequency.setValueAtTime(frequencies[type] || 600, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        
    } catch (error) {
        console.log('Audio not available for alerts');
    }
}

function setupZoneManagement() {
    // Create zone button
    const createBtn = document.getElementById('create-zone');
    if (createBtn) {
        createBtn.addEventListener('click', openCreateZoneDialog);
    }
    
    // Import zones button
    const importBtn = document.getElementById('import-zones');
    if (importBtn) {
        importBtn.addEventListener('click', importSafetyZones);
    }
}

function setupAlertSettings() {
    // Alert checkboxes
    const alertCheckboxes = {
        'enable-zone-alerts': 'enableZoneAlerts',
        'enable-danger-alerts': 'enableDangerAlerts',
        'enable-safe-alerts': 'enableSafeAlerts',
        'enable-sound-alerts': 'enableSoundAlerts'
    };
    
    Object.entries(alertCheckboxes).forEach(([id, setting]) => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.checked = alertSettings[setting];
            checkbox.addEventListener('change', function() {
                alertSettings[setting] = this.checked;
                saveAlertSettings();
            });
        }
    });
    
    // Alert radius slider
    const radiusSlider = document.getElementById('alert-radius-slider');
    const radiusValue = document.getElementById('radius-value');
    
    if (radiusSlider && radiusValue) {
        radiusSlider.value = alertSettings.alertRadius;
        radiusValue.textContent = alertSettings.alertRadius;
        
        radiusSlider.addEventListener('input', function() {
            alertSettings.alertRadius = parseInt(this.value);
            radiusValue.textContent = this.value;
            saveAlertSettings();
        });
    }
    
    // Test alert buttons
    const testSafeBtn = document.getElementById('test-safe-alert');
    const testDangerBtn = document.getElementById('test-danger-alert');
    
    if (testSafeBtn) {
        testSafeBtn.addEventListener('click', () => {
            showZoneAlert('safe', '✅ Test Safe Zone Alert', 'This is how safe zone alerts will appear');
        });
    }
    
    if (testDangerBtn) {
        testDangerBtn.addEventListener('click', () => {
            showZoneAlert('danger', '⚠️ Test Danger Alert', 'This is how danger zone alerts will appear');
        });
    }
}

function loadDefaultSafetyZones() {
    // Load some default safety zones for demonstration
    const defaultZones = [
        {
            id: 'default-1',
            name: 'Central Police Station',
            type: 'safe',
            latitude: 28.6139,
            longitude: 77.2090,
            radius: 200,
            description: 'Police station area - high security presence'
        },
        {
            id: 'default-2',
            name: 'Metro Station Safe Zone',
            type: 'safe',
            latitude: 28.6129,
            longitude: 77.2295,
            radius: 150,
            description: 'Well-lit metro station with security cameras'
        },
        {
            id: 'default-3',
            name: 'Construction Area',
            type: 'warning',
            latitude: 28.6180,
            longitude: 77.2100,
            radius: 300,
            description: 'Active construction - avoid during night hours'
        }
    ];
    
    // Only add if no zones exist
    if (safetyZones.length === 0) {
        safetyZones = defaultZones;
        saveSafetyZones();
    }
}

// Utility Functions
function calculateDistance(pos1, pos2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = pos1.latitude * Math.PI/180;
    const φ2 = pos2.latitude * Math.PI/180;
    const Δφ = (pos2.latitude-pos1.latitude) * Math.PI/180;
    const Δλ = (pos2.longitude-pos1.longitude) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

function getZoneIcon(type) {
    const icons = {
        safe: 'shield-check',
        warning: 'exclamation-triangle',
        danger: 'times-circle'
    };
    return icons[type] || 'map-marker-alt';
}

// Storage Functions
function saveSafetyZones() {
    localStorage.setItem('rakshita_safety_zones', JSON.stringify(safetyZones));
}

function loadSafetyZones() {
    const saved = localStorage.getItem('rakshita_safety_zones');
    if (saved) {
        safetyZones = JSON.parse(saved);
    }
}

function saveAlertSettings() {
    localStorage.setItem('rakshita_alert_settings', JSON.stringify(alertSettings));
}

function loadAlertSettings() {
    const saved = localStorage.getItem('rakshita_alert_settings');
    if (saved) {
        alertSettings = { ...alertSettings, ...JSON.parse(saved) };
    }
}

function saveLocationData(location) {
    // Save to database if available
    try {
        if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
            window.firebaseDataManager.saveLocation(location);
        } else {
            window.rakshitaData.saveLocation(location);
        }
    } catch (error) {
        console.error('Failed to save location:', error);
    }
}

// Enhanced location tracking for dashboard
function startContinuousLocationTracking() {
    if (!navigator.geolocation) {
        console.log('Geolocation not supported');
        return;
    }
    
    const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 30000 // Update every 30 seconds
    };
    
    // Watch position for continuous tracking
    const watchId = navigator.geolocation.watchPosition(
        async (position) => {
            const locationData = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                speed: position.coords.speed,
                heading: position.coords.heading,
                timestamp: new Date().toISOString()
            };
            
            // Save to database
            try {
                if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
                    await window.firebaseDataManager.saveLocation(locationData);
                } else {
                    window.rakshitaData.saveLocation(locationData);
                }
                
                // Update dashboard if open
                updateDashboardLocation(locationData);
                
            } catch (error) {
                console.error('Failed to save location:', error);
            }
        },
        (error) => {
            console.error('Continuous location tracking error:', error);
            handleLocationError(error);
        },
        options
    );
    
    // Store watch ID for cleanup
    window.locationWatchId = watchId;
    
    return watchId;
}

// Update dashboard with new location
function updateDashboardLocation(locationData) {
    // Update coordinates display
    const coordsElement = document.getElementById('current-coords');
    if (coordsElement) {
        coordsElement.textContent = `${locationData.latitude.toFixed(6)}, ${locationData.longitude.toFixed(6)}`;
    }
    
    // Update accuracy info
    updateLocationStatus(locationData.accuracy);
    
    // Update map visualization (if dashboard is open)
    const userLocationElement = document.querySelector('.user-location');
    if (userLocationElement) {
        // Add pulse animation to show active tracking
        userLocationElement.style.animation = 'pulse 2s infinite';
    }
    
    // Show speed if available
    if (locationData.speed && locationData.speed > 0) {
        const speedKmh = (locationData.speed * 3.6).toFixed(1);
        console.log(`Current speed: ${speedKmh} km/h`);
    }
}

// Stop continuous location tracking
function stopLocationTracking() {
    if (window.locationWatchId) {
        navigator.geolocation.clearWatch(window.locationWatchId);
        window.locationWatchId = null;
        
        const statusElement = document.getElementById('location-status');
        if (statusElement) {
            statusElement.textContent = 'Location tracking paused';
            statusElement.style.color = '#6b7280';
        }
    }
}

// Auto-start location tracking when dashboard opens
const originalOpenDashboard = window.openDashboard;
if (originalOpenDashboard) {
    window.openDashboard = function() {
        const result = originalOpenDashboard.apply(this, arguments);
        
        // Start continuous tracking when dashboard opens
        setTimeout(() => {
            console.log('🎯 Dashboard opened - checking location tracking...');
            
            // If location section is active, ensure tracking is running
            const locationSection = document.getElementById('location-section');
            if (locationSection && locationSection.classList.contains('active')) {
                if (!liveTrackingId) {
                    console.log('Starting live tracking for dashboard...');
                    startLiveTracking();
                }
            }
        }, 1000);
        
        return result;
    };
}

// Stop tracking when dashboard closes
const originalCloseDashboard = window.closeDashboard;
if (originalCloseDashboard) {
    window.closeDashboard = function() {
        const result = originalCloseDashboard.apply(this, arguments);
        
        // Stop live tracking when dashboard closes to save battery
        console.log('🛑 Dashboard closed - stopping live tracking...');
        stopLiveTracking();
        
        return result;
    };
}
// Community Review System Functions (moved to community.js)



// Enhanced Review Form Setup
function setupEnhancedReviewForm() {
    const form = document.getElementById('area-review-form');
    const useLocationBtn = document.getElementById('use-current-location');
    
    // Enhanced use current location button
    if (useLocationBtn) {
        useLocationBtn.addEventListener('click', async function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting Location...';
            this.disabled = true;
            
            try {
                if (navigator.geolocation) {
                    const options = {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 60000
                    };
                    
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            try {
                                const address = await getRealAddress(position.coords.latitude, position.coords.longitude);
                                document.getElementById('review-location').value = address;
                                showNotification('📍 Current location added successfully!', 'success');
                            } catch (error) {
                                const coords = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
                                document.getElementById('review-location').value = coords;
                                showNotification('📍 Location coordinates added', 'info');
                            }
                            
                            this.innerHTML = '<i class="fas fa-crosshairs"></i> Use Current Location';
                            this.disabled = false;
                        },
                        (error) => {
                            let errorMessage = 'Could not get location. ';
                            switch(error.code) {
                                case error.PERMISSION_DENIED:
                                    errorMessage += 'Please enable location access.';
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    errorMessage += 'Location information unavailable.';
                                    break;
                                case error.TIMEOUT:
                                    errorMessage += 'Location request timed out.';
                                    break;
                                default:
                                    errorMessage += 'Please enter manually.';
                                    break;
                            }
                            showNotification(errorMessage, 'error');
                            this.innerHTML = '<i class="fas fa-crosshairs"></i> Use Current Location';
                            this.disabled = false;
                        },
                        options
                    );
                }
            } catch (error) {
                showNotification('Location not available', 'error');
                this.innerHTML = '<i class="fas fa-crosshairs"></i> Use Current Location';
                this.disabled = false;
            }
        });
    }
    
    // Enhanced form submission
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            await submitEnhancedAreaReview();
        });
    }
}

// Enhanced Star Rating Setup
function setupEnhancedStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingDescription = document.getElementById('rating-description');
    let selectedRating = 0;
    
    const descriptions = {
        1: '⭐ Very Unsafe - Serious safety concerns, avoid if possible',
        2: '⭐⭐ Unsafe - Multiple safety issues, use extreme caution',
        3: '⭐⭐⭐ Moderate - Some safety concerns, be cautious',
        4: '⭐⭐⭐⭐ Safe - Generally good area with minor concerns',
        5: '⭐⭐⭐⭐⭐ Very Safe - Excellent safety, highly recommended'
    };
    
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
            if (ratingDescription) {
                ratingDescription.textContent = descriptions[rating];
                ratingDescription.style.color = getRatingColor(rating);
            }
        });
        
        star.addEventListener('mouseout', function() {
            highlightStars(selectedRating);
            if (ratingDescription && selectedRating > 0) {
                ratingDescription.textContent = descriptions[selectedRating];
                ratingDescription.style.color = getRatingColor(selectedRating);
            } else if (ratingDescription) {
                ratingDescription.textContent = 'Click stars to rate safety';
                ratingDescription.style.color = '';
            }
        });
        
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            highlightStars(selectedRating);
            if (ratingDescription) {
                ratingDescription.textContent = descriptions[selectedRating];
                ratingDescription.style.color = getRatingColor(selectedRating);
            }
            
            // Add visual feedback
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    function getRatingColor(rating) {
        const colors = {
            1: '#ef4444',
            2: '#f97316',
            3: '#f59e0b',
            4: '#84cc16',
            5: '#10b981'
        };
        return colors[rating] || '';
    }
}

// Enhanced Review Submission
async function submitEnhancedAreaReview() {
    const formData = {
        location: document.getElementById('review-location').value.trim(),
        category: document.getElementById('review-category').value,
        rating: document.querySelectorAll('.star.active').length,
        title: document.getElementById('review-title').value.trim(),
        description: document.getElementById('review-description').value.trim(),
        tips: document.getElementById('review-tips').value.trim(),
        anonymous: document.getElementById('anonymous-review').checked,
        features: Array.from(document.querySelectorAll('.feature-checkbox input:checked')).map(cb => cb.value),
        timestamp: new Date().toISOString()
    };
    
    // Enhanced validation
    const errors = [];
    if (!formData.location) errors.push('Location is required');
    if (!formData.category) errors.push('Experience type is required');
    if (!formData.rating || formData.rating === 0) errors.push('Safety rating is required');
    if (!formData.title) errors.push('Review title is required');
    if (!formData.description) errors.push('Experience description is required');
    if (formData.title.length < 5) errors.push('Title must be at least 5 characters');
    if (formData.description.length < 20) errors.push('Description must be at least 20 characters');
    
    if (errors.length > 0) {
        showNotification('Please fix the following:\n• ' + errors.join('\n• '), 'error');
        return;
    }
    
    try {
        // Get current location for the review
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    formData.coordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    await saveEnhancedReview(formData);
                },
                async () => {
                    // Save without coordinates if location unavailable
                    await saveEnhancedReview(formData);
                }
            );
        } else {
            await saveEnhancedReview(formData);
        }
    } catch (error) {
        console.error('Error submitting enhanced review:', error);
        showNotification('Failed to submit review. Please try again.', 'error');
    }
}

// Enhanced Review Saving
async function saveEnhancedReview(reviewData) {
    try {
        const submitBtn = document.querySelector('.submit-review-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Review...';
        submitBtn.disabled = true;
        
        // Add user info if not anonymous
        if (!reviewData.anonymous && currentUser) {
            reviewData.authorName = currentUser.name;
            reviewData.authorId = currentUser.id;
        } else {
            reviewData.authorName = 'Anonymous User';
            reviewData.authorId = null;
        }
        
        // Add helpful metadata
        reviewData.helpfulCount = 0;
        reviewData.reportCount = 0;
        reviewData.verified = false;
        reviewData.id = generateReviewId();
        
        // Save to Firebase or local storage
        let savedReview;
        if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
            savedReview = await window.firebaseDataManager.addCommunityUpdate({
                type: 'area_review',
                message: reviewData.description,
                location: reviewData.coordinates,
                data: reviewData
            });
        } else {
            savedReview = window.rakshitaData.addCommunityUpdate({
                type: 'area_review',
                message: reviewData.description,
                location: reviewData.coordinates,
                data: reviewData
            });
        }
        
        // Success feedback with celebration
        showNotification('🎉 Review submitted successfully! Thank you for helping the community stay safe.', 'success');
        createCelebration();
        clearEnhancedReviewForm();
        
        // Refresh reviews list
        setTimeout(() => {
            loadEnhancedAreaReviews();
        }, 500);
        
        // Switch to reviews tab to show the new review
        setTimeout(() => {
            document.querySelector('[data-tab="reviews"]').click();
        }, 1000);
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    } catch (error) {
        console.error('Error saving enhanced review:', error);
        showNotification('Failed to save review. Please try again.', 'error');
        
        const submitBtn = document.querySelector('.submit-review-btn');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Share Review';
        submitBtn.disabled = false;
    }
}

// Enhanced Review Form Clearing
function clearEnhancedReviewForm() {
    const form = document.getElementById('area-review-form');
    if (form) {
        form.reset();
        
        // Clear star rating
        document.querySelectorAll('.star').forEach(star => {
            star.classList.remove('active');
        });
        
        const ratingDescription = document.getElementById('rating-description');
        if (ratingDescription) {
            ratingDescription.textContent = 'Click stars to rate safety';
            ratingDescription.style.color = '';
        }
        
        // Clear checkboxes
        document.querySelectorAll('.feature-checkbox input').forEach(checkbox => {
            checkbox.checked = false;
        });
    }
}

// Enhanced Area Reviews Loading
async function loadEnhancedAreaReviews() {
    const reviewsList = document.getElementById('reviews-list');
    if (!reviewsList) return;
    
    // Show enhanced loading state
    reviewsList.innerHTML = `
        <div class="reviews-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Loading community reviews...</p>
        </div>
    `;
    
    try {
        let reviews = [];
        
        // Get reviews from Firebase or local storage
        if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
            const communityUpdates = await window.firebaseDataManager.getCommunityUpdates(100);
            reviews = communityUpdates.filter(update => update.type === 'area_review');
        } else {
            const communityUpdates = window.rakshitaData.getCommunityUpdates(100);
            reviews = communityUpdates.filter(update => update.type === 'area_review');
        }
        
        // Add some demo reviews if none exist
        if (reviews.length === 0) {
            reviews = generateDemoReviews();
        }
        
        if (reviews.length === 0) {
            reviewsList.innerHTML = `
                <div class="empty-reviews">
                    <i class="fas fa-star"></i>
                    <h4>No reviews yet</h4>
                    <p>Be the first to share your area experience and help fellow travelers stay safe!</p>
                    <button class="btn-primary" onclick="document.querySelector('[data-tab=\\"write-review\\"]').click()" style="margin-top: 1rem;">
                        <i class="fas fa-edit"></i> Write First Review
                    </button>
                </div>
            `;
            return;
        }
        
        // Sort reviews by timestamp (newest first)
        reviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Render enhanced reviews
        reviewsList.innerHTML = reviews.map(review => createEnhancedReviewCard(review)).join('');
        
        // Setup enhanced review interactions
        setupEnhancedReviewInteractions();
        
    } catch (error) {
        console.error('Error loading enhanced reviews:', error);
        reviewsList.innerHTML = `
            <div class="empty-reviews">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Error loading reviews</h4>
                <p>Please check your connection and try again.</p>
                <button class="btn-primary" onclick="loadEnhancedAreaReviews()" style="margin-top: 1rem;">
                    <i class="fas fa-refresh"></i> Try Again
                </button>
            </div>
        `;
    }
}

// Generate Demo Reviews for Testing
function generateDemoReviews() {
    const demoReviews = [
        {
            id: 'demo-1',
            type: 'area_review',
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
            userName: 'Sarah Chen',
            data: {
                location: 'Connaught Place, New Delhi',
                category: 'shopping',
                rating: 4,
                title: 'Safe shopping area with good security',
                description: 'Visited during daytime for shopping. The area is well-maintained with good police presence. Lots of CCTV cameras and security guards. Streets are well-lit and crowded which adds to safety. Only concern is pickpocketing in very crowded areas.',
                tips: 'Keep valuables secure in crowded areas. Best to visit during daytime. Use the metro station entrance for safer access.',
                features: ['well-lit', 'police-presence', 'cctv', 'crowded', 'security-guards'],
                authorName: 'Sarah Chen',
                helpfulCount: 12,
                coordinates: { latitude: 28.6315, longitude: 77.2167 }
            }
        },
        {
            id: 'demo-2',
            type: 'area_review',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            userName: 'Raj Patel',
            data: {
                location: 'India Gate, New Delhi',
                category: 'tourist',
                rating: 5,
                title: 'Excellent safety for tourists, highly recommended',
                description: 'Visited with family in the evening. Very safe area with excellent lighting and heavy police presence. Lots of families and tourists around. Clean and well-maintained. Emergency services nearby. Perfect for evening walks.',
                tips: 'Great for evening visits. Parking can be challenging, use metro. Carry water bottles as vendors can be expensive.',
                features: ['well-lit', 'police-presence', 'crowded', 'emergency-services'],
                authorName: 'Raj Patel',
                helpfulCount: 8,
                coordinates: { latitude: 28.6129, longitude: 77.2295 }
            }
        },
        {
            id: 'demo-3',
            type: 'area_review',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
            userName: 'Anonymous User',
            data: {
                location: 'Karol Bagh Market, New Delhi',
                category: 'nighttime',
                rating: 2,
                title: 'Avoid after dark - poor lighting and safety concerns',
                description: 'Visited around 9 PM for shopping. Very poor lighting in side streets. Limited police presence after 8 PM. Some areas felt unsafe due to lack of crowd and poor visibility. Would not recommend for solo travelers at night.',
                tips: 'Visit only during daytime. Stick to main roads. Avoid side lanes after sunset. Travel in groups if possible.',
                features: [],
                authorName: 'Anonymous User',
                helpfulCount: 15,
                coordinates: { latitude: 28.6517, longitude: 77.1910 }
            }
        }
    ];
    
    return demoReviews;
}

// Create Enhanced Review Card
function createEnhancedReviewCard(review) {
    const data = review.data || {};
    const timeAgo = getTimeAgo(review.timestamp);
    const authorName = data.authorName || review.userName || 'Anonymous User';
    const authorInitial = authorName.charAt(0).toUpperCase();
    
    // Create star rating display
    const stars = Array.from({length: 5}, (_, i) => {
        const filled = i < (data.rating || 0);
        return `<span class="star ${filled ? '' : 'empty'}">★</span>`;
    }).join('');
    
    // Create feature tags
    const featureTags = (data.features || []).map(feature => {
        const featureNames = {
            'well-lit': '💡 Well Lit',
            'police-presence': '👮 Police Presence',
            'cctv': '📹 CCTV',
            'crowded': '👥 Crowded',
            'security-guards': '🛡️ Security',
            'emergency-services': '🚑 Emergency Services'
        };
        return `<span class="feature-tag">${featureNames[feature] || feature}</span>`;
    }).join('');
    
    // Get rating color
    const ratingColors = {
        1: '#ef4444',
        2: '#f97316', 
        3: '#f59e0b',
        4: '#84cc16',
        5: '#10b981'
    };
    const ratingColor = ratingColors[data.rating] || '#6b7280';
    
    return `
        <div class="review-card" data-review-id="${review.id}">
            <div class="review-category ${data.category || 'general'}">${getCategoryName(data.category)}</div>
            
            <div class="review-header">
                <div class="review-author">
                    <div class="author-avatar">${authorInitial}</div>
                    <div class="author-info">
                        <h5>${authorName}</h5>
                        <small>${timeAgo}</small>
                    </div>
                </div>
                <div class="review-rating">
                    <div class="review-stars">${stars}</div>
                    <span class="rating-text" style="color: ${ratingColor}">${data.rating || 0}/5</span>
                </div>
            </div>
            
            <div class="review-location">📍 ${data.location || 'Location not specified'}</div>
            
            <div class="review-title">${data.title || 'No title'}</div>
            <div class="review-description">${data.description || review.message}</div>
            
            ${featureTags ? `<div class="review-features">${featureTags}</div>` : ''}
            
            ${data.tips ? `
                <div class="review-tips">
                    <strong>💡 Safety Tips:</strong>
                    <p>${data.tips}</p>
                </div>
            ` : ''}
            
            <div class="review-footer">
                <div class="review-actions">
                    <button class="review-action helpful-btn" onclick="markReviewHelpful('${review.id}')">
                        <i class="fas fa-thumbs-up"></i>
                        <span>Helpful (${data.helpfulCount || 0})</span>
                    </button>
                    <button class="review-action share-btn" onclick="shareReview('${review.id}')">
                        <i class="fas fa-share"></i>
                        <span>Share</span>
                    </button>
                    <button class="review-action report-btn" onclick="reportReview('${review.id}')">
                        <i class="fas fa-flag"></i>
                        <span>Report</span>
                    </button>
                </div>
                <div class="review-time">${timeAgo}</div>
            </div>
        </div>
    `;
}

// Helper Functions
function getCategoryName(category) {
    const categoryNames = {
        'general': 'General Safety',
        'daytime': 'Daytime',
        'nighttime': 'Nighttime', 
        'transport': 'Transport',
        'shopping': 'Shopping',
        'dining': 'Dining',
        'tourist': 'Tourist Spot',
        'emergency': 'Emergency'
    };
    return categoryNames[category] || 'General';
}

function generateReviewId() {
    return 'review_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Enhanced Review Interactions
function setupEnhancedReviewInteractions() {
    // Filter functionality
    const filterSelect = document.getElementById('review-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            filterEnhancedReviews(this.value);
        });
    }
}

function filterEnhancedReviews(filterValue) {
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach(card => {
        const ratingText = card.querySelector('.rating-text').textContent;
        const rating = parseInt(ratingText);
        let show = true;
        
        switch(filterValue) {
            case '5':
                show = rating === 5;
                break;
            case '4':
                show = rating >= 4;
                break;
            case '3':
                show = rating >= 3;
                break;
            case 'recent':
                show = true; // Already sorted by recent
                break;
            default:
                show = true;
        }
        
        card.style.display = show ? 'block' : 'none';
    });
}

// Review Actions
function markReviewHelpful(reviewId) {
    const helpfulBtn = document.querySelector(`[data-review-id="${reviewId}"] .helpful-btn span`);
    if (helpfulBtn) {
        const currentCount = parseInt(helpfulBtn.textContent.match(/\d+/)[0]);
        helpfulBtn.textContent = `Helpful (${currentCount + 1})`;
        
        // Add visual feedback
        const btn = helpfulBtn.parentElement;
        btn.style.color = '#10b981';
        btn.style.borderColor = '#10b981';
        btn.disabled = true;
        
        showNotification('Thank you for your feedback! 👍', 'success');
    }
}

function shareReview(reviewId) {
    if (navigator.share) {
        navigator.share({
            title: 'Safety Review - Rakshita',
            text: 'Check out this helpful safety review on Rakshita',
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Review link copied to clipboard! 📋', 'success');
        });
    }
}

function reportReview(reviewId) {
    if (confirm('Are you sure you want to report this review for inappropriate content?')) {
        showNotification('Review reported. Thank you for keeping our community safe. 🛡️', 'info');
        
        // Optionally hide the review
        const reviewCard = document.querySelector(`[data-review-id="${reviewId}"]`);
        if (reviewCard) {
            reviewCard.style.opacity = '0.5';
            reviewCard.style.pointerEvents = 'none';
        }
    }
}

// Enhanced Nearby Reviews
async function loadEnhancedNearbyReviews() {
    const nearbyList = document.getElementById('nearby-reviews-list');
    if (!nearbyList) return;
    
    nearbyList.innerHTML = `
        <div class="reviews-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Finding reviews near your location...</p>
        </div>
    `;
    
    try {
        if (!navigator.geolocation) {
            nearbyList.innerHTML = `
                <div class="empty-reviews">
                    <i class="fas fa-location-slash"></i>
                    <h4>Location not available</h4>
                    <p>Enable location access to see nearby reviews and help fellow travelers in your area.</p>
                </div>
            `;
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const radius = parseInt(document.getElementById('search-radius').value) || 5;
                
                // Get all reviews and filter by distance
                let allReviews = [];
                if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
                    const communityUpdates = await window.firebaseDataManager.getCommunityUpdates(200);
                    allReviews = communityUpdates.filter(update => update.type === 'area_review');
                } else {
                    const communityUpdates = window.rakshitaData.getCommunityUpdates(200);
                    allReviews = communityUpdates.filter(update => update.type === 'area_review');
                }
                
                // Add demo reviews if none exist
                if (allReviews.length === 0) {
                    allReviews = generateDemoReviews();
                }
                
                // Filter reviews within radius
                const nearbyReviews = allReviews.filter(review => {
                    if (!review.data || !review.data.coordinates) return false;
                    
                    const distance = calculateDistance(
                        userLat, userLng,
                        review.data.coordinates.latitude,
                        review.data.coordinates.longitude
                    );
                    
                    return distance <= radius;
                });
                
                if (nearbyReviews.length === 0) {
                    nearbyList.innerHTML = `
                        <div class="empty-reviews">
                            <i class="fas fa-map-marker-alt"></i>
                            <h4>No nearby reviews</h4>
                            <p>No reviews found within ${radius} km of your location. Be the first to share your experience!</p>
                            <button class="btn-primary" onclick="document.querySelector('[data-tab=\\"write-review\\"]').click()" style="margin-top: 1rem;">
                                <i class="fas fa-edit"></i> Write Review
                            </button>
                        </div>
                    `;
                    return;
                }
                
                // Sort by distance
                nearbyReviews.sort((a, b) => {
                    const distA = calculateDistance(userLat, userLng, a.data.coordinates.latitude, a.data.coordinates.longitude);
                    const distB = calculateDistance(userLat, userLng, b.data.coordinates.latitude, b.data.coordinates.longitude);
                    return distA - distB;
                });
                
                nearbyList.innerHTML = nearbyReviews.map(review => {
                    const distance = calculateDistance(
                        userLat, userLng,
                        review.data.coordinates.latitude,
                        review.data.coordinates.longitude
                    );
                    
                    return createEnhancedNearbyReviewCard(review, distance);
                }).join('');
            },
            (error) => {
                nearbyList.innerHTML = `
                    <div class="empty-reviews">
                        <i class="fas fa-location-slash"></i>
                        <h4>Location access needed</h4>
                        <p>Please enable location access to see reviews near you and help fellow travelers in your area.</p>
                        <button class="btn-primary" onclick="loadEnhancedNearbyReviews()" style="margin-top: 1rem;">
                            <i class="fas fa-location-arrow"></i> Try Again
                        </button>
                    </div>
                `;
            }
        );
        
    } catch (error) {
        console.error('Error loading enhanced nearby reviews:', error);
        nearbyList.innerHTML = `
            <div class="empty-reviews">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Error loading reviews</h4>
                <p>Please check your connection and try again.</p>
                <button class="btn-primary" onclick="loadEnhancedNearbyReviews()" style="margin-top: 1rem;">
                    <i class="fas fa-refresh"></i> Try Again
                </button>
            </div>
        `;
    }
}

function createEnhancedNearbyReviewCard(review, distance) {
    const reviewCard = createEnhancedReviewCard(review);
    const distanceInfo = `<div class="review-distance">📍 ${distance.toFixed(1)} km away</div>`;
    
    // Insert distance info after category
    return reviewCard.replace(
        '<div class="review-header">',
        distanceInfo + '<div class="review-header">'
    );
}

// Enhanced Community Feed
function loadEnhancedCommunityFeed() {
    const feedContainer = document.querySelector('#community-feed-tab .community-feed-full');
    if (!feedContainer) return;
    
    feedContainer.innerHTML = `
        <div class="community-updates">
            <h4>Recent Safety Updates</h4>
            <div class="safety-update">
                <div class="update-avatar">
                    <i class="fas fa-user-shield"></i>
                </div>
                <div class="update-content">
                    <strong>Safety Ambassador</strong>
                    <p>🛡️ Area around Central Park Metro Station is safe and well-monitored. Good lighting and regular police patrols. Recommended for evening travel.</p>
                    <span class="update-time">5 min ago</span>
                </div>
            </div>
            <div class="safety-update">
                <div class="update-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="update-content">
                    <strong>Fellow Traveler</strong>
                    <p>☕ Great coffee shop on MG Road - safe, well-lit area with good WiFi. Perfect for digital nomads. Open until 10 PM.</p>
                    <span class="update-time">20 min ago</span>
                </div>
            </div>
            <div class="safety-update">
                <div class="update-avatar">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="update-content">
                    <strong>Local Resident</strong>
                    <p>⚠️ Construction work on Park Street causing poor lighting after 8 PM. Use alternate route via Main Road for better safety.</p>
                    <span class="update-time">1 hour ago</span>
                </div>
            </div>
            <div class="safety-update">
                <div class="update-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="update-content">
                    <strong>Tourist Guide</strong>
                    <p>🎯 Red Fort area is very safe for tourists during daytime. Security checks at entry, clean facilities, and helpful staff. Avoid side streets after sunset.</p>
                    <span class="update-time">2 hours ago</span>
                </div>
            </div>
        </div>
    `;
}

// Setup additional controls
function setupReviewFilters() {
    const filterSelect = document.getElementById('review-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            filterEnhancedReviews(this.value);
        });
    }
}

function setupNearbyControls() {
    const radiusSelector = document.getElementById('search-radius');
    if (radiusSelector) {
        radiusSelector.addEventListener('change', function() {
            loadEnhancedNearbyReviews();
        });
    }
}

// Community Tabs Management
function setupCommunityTabs() {
    const tabs = document.querySelectorAll('.community-tab');
    const tabContents = document.querySelectorAll('.community-tab-content');
    
    console.log('Found tabs:', tabs.length);
    console.log('Found tab contents:', tabContents.length);
    
    if (tabs.length === 0) {
        console.error('No community tabs found!');
        return;
    }
    
    tabs.forEach((tab, index) => {
        console.log(`Setting up tab ${index}:`, tab.dataset.tab);
        
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabName = this.dataset.tab;
            console.log('Tab clicked:', tabName);
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(tabName + '-tab');
            
            if (targetContent) {
                targetContent.classList.add('active');
                console.log('Activated tab content:', tabName + '-tab');
                
                // Load content based on tab
                switch(tabName) {
                    case 'reviews':
                        loadAreaReviews();
                        break;
                    case 'nearby':
                        loadNearbyReviews();
                        break;
                    case 'write-review':
                        // Form is already loaded, just focus first input
                        const firstInput = targetContent.querySelector('input');
                        if (firstInput) {
                            setTimeout(() => firstInput.focus(), 100);
                        }
                        break;
                    case 'feed':
                        loadCommunityFeed();
                        break;
                }
            } else {
                console.error('Tab content not found:', tabName + '-tab');
            }
        });
    });
    
    // Ensure the first tab is active
    if (tabs.length > 0 && !document.querySelector('.community-tab.active')) {
        tabs[0].classList.add('active');
        const firstTabContent = document.querySelector('.community-tab-content');
        if (firstTabContent) {
            firstTabContent.classList.add('active');
        }
    }
}

// Review Form Setup
function setupReviewForm() {
    const form = document.getElementById('area-review-form');
    const useLocationBtn = document.getElementById('use-current-location');
    const categorySelect = document.getElementById('review-category');
    
    // Use current location button
    if (useLocationBtn) {
        useLocationBtn.addEventListener('click', async function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting Location...';
            this.disabled = true;
            
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            try {
                                const address = await getRealAddress(position.coords.latitude, position.coords.longitude);
                                document.getElementById('review-location').value = address;
                                showNotification('Current location added!', 'success');
                            } catch (error) {
                                document.getElementById('review-location').value = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
                                showNotification('Location coordinates added', 'info');
                            }
                            
                            this.innerHTML = '<i class="fas fa-crosshairs"></i> Use Current Location';
                            this.disabled = false;
                        },
                        (error) => {
                            showNotification('Could not get location. Please enter manually.', 'error');
                            this.innerHTML = '<i class="fas fa-crosshairs"></i> Use Current Location';
                            this.disabled = false;
                        }
                    );
                }
            } catch (error) {
                showNotification('Location not available', 'error');
                this.innerHTML = '<i class="fas fa-crosshairs"></i> Use Current Location';
                this.disabled = false;
            }
        });
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            await submitAreaReview();
        });
    }
}

// Star Rating Setup
function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    const ratingDescription = document.getElementById('rating-description');
    let selectedRating = 0;
    
    const descriptions = {
        1: '⭐ Very Unsafe - Avoid this area',
        2: '⭐⭐ Unsafe - Use extreme caution',
        3: '⭐⭐⭐ Moderate - Be cautious',
        4: '⭐⭐⭐⭐ Safe - Generally good area',
        5: '⭐⭐⭐⭐⭐ Very Safe - Highly recommended'
    };
    
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
            if (ratingDescription) {
                ratingDescription.textContent = descriptions[rating];
            }
        });
        
        star.addEventListener('mouseout', function() {
            highlightStars(selectedRating);
            if (ratingDescription && selectedRating > 0) {
                ratingDescription.textContent = descriptions[selectedRating];
            } else if (ratingDescription) {
                ratingDescription.textContent = 'Click stars to rate safety';
            }
        });
        
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            highlightStars(selectedRating);
            if (ratingDescription) {
                ratingDescription.textContent = descriptions[selectedRating];
            }
        });
    });
    
    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
}

// Submit Area Review
async function submitAreaReview() {
    const formData = {
        location: document.getElementById('review-location').value,
        category: document.getElementById('review-category').value,
        rating: document.querySelectorAll('.star.active').length,
        title: document.getElementById('review-title').value,
        description: document.getElementById('review-description').value,
        tips: document.getElementById('review-tips').value,
        anonymous: document.getElementById('anonymous-review').checked,
        features: Array.from(document.querySelectorAll('.feature-checkbox input:checked')).map(cb => cb.value),
        timestamp: new Date().toISOString()
    };
    
    // Validate required fields
    if (!formData.location || !formData.category || !formData.rating || !formData.title || !formData.description) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (formData.rating === 0) {
        showNotification('Please provide a safety rating', 'error');
        return;
    }
    
    try {
        // Get current location for the review
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    formData.coordinates = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    await saveReview(formData);
                },
                async () => {
                    // Save without coordinates if location unavailable
                    await saveReview(formData);
                }
            );
        } else {
            await saveReview(formData);
        }
    } catch (error) {
        console.error('Error submitting review:', error);
        showNotification('Failed to submit review. Please try again.', 'error');
    }
}

// Save Review to Database
async function saveReview(reviewData) {
    try {
        const submitBtn = document.querySelector('#area-review-form button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        // Add user info if not anonymous
        if (!reviewData.anonymous && currentUser) {
            reviewData.authorName = currentUser.name;
            reviewData.authorId = currentUser.id;
        } else {
            reviewData.authorName = 'Anonymous User';
            reviewData.authorId = null;
        }
        
        // Save to Firebase or local storage
        let savedReview;
        if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
            savedReview = await window.firebaseDataManager.addCommunityUpdate({
                type: 'area_review',
                message: reviewData.description,
                location: reviewData.coordinates,
                data: reviewData
            });
        } else {
            savedReview = window.rakshitaData.addCommunityUpdate({
                type: 'area_review',
                message: reviewData.description,
                location: reviewData.coordinates,
                data: reviewData
            });
        }
        
        showNotification('Review submitted successfully! Thank you for helping the community.', 'success');
        clearReviewForm();
        
        // Refresh reviews list
        loadAreaReviews();
        
        // Switch to reviews tab to show the new review
        document.querySelector('[data-tab="reviews"]').click();
        
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Share Review';
        submitBtn.disabled = false;
        
    } catch (error) {
        console.error('Error saving review:', error);
        showNotification('Failed to save review. Please try again.', 'error');
        
        const submitBtn = document.querySelector('#area-review-form button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Share Review';
        submitBtn.disabled = false;
    }
}

// Clear Review Form
function clearReviewForm() {
    const form = document.getElementById('area-review-form');
    if (form) {
        form.reset();
        
        // Clear star rating
        document.querySelectorAll('.star').forEach(star => {
            star.classList.remove('active');
        });
        
        const ratingDescription = document.getElementById('rating-description');
        if (ratingDescription) {
            ratingDescription.textContent = 'Click stars to rate safety';
        }
    }
}

// Load Area Reviews
async function loadAreaReviews() {
    const reviewsList = document.getElementById('reviews-list');
    if (!reviewsList) return;
    
    // Show loading state
    reviewsList.innerHTML = `
        <div class="reviews-loading">
            <i class="fas fa-spinner fa-spin"></i>
            Loading reviews...
        </div>
    `;
    
    try {
        let reviews = [];
        
        // Get reviews from Firebase or local storage
        if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
            const communityUpdates = await window.firebaseDataManager.getCommunityUpdates(50);
            reviews = communityUpdates.filter(update => update.type === 'area_review');
        } else {
            const communityUpdates = window.rakshitaData.getCommunityUpdates(50);
            reviews = communityUpdates.filter(update => update.type === 'area_review');
        }
        
        if (reviews.length === 0) {
            reviewsList.innerHTML = `
                <div class="empty-reviews">
                    <i class="fas fa-star"></i>
                    <h4>No reviews yet</h4>
                    <p>Be the first to share your area experience!</p>
                </div>
            `;
            return;
        }
        
        // Sort reviews by timestamp (newest first)
        reviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Render reviews
        reviewsList.innerHTML = reviews.map(review => createReviewCard(review)).join('');
        
        // Setup review interactions
        setupReviewInteractions();
        
    } catch (error) {
        console.error('Error loading reviews:', error);
        reviewsList.innerHTML = `
            <div class="empty-reviews">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Error loading reviews</h4>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

// Create Review Card HTML
function createReviewCard(review) {
    const data = review.data || {};
    const timeAgo = getTimeAgo(review.timestamp);
    const authorName = data.authorName || review.userName || 'Anonymous User';
    const authorInitial = authorName.charAt(0).toUpperCase();
    
    // Create star rating display
    const stars = Array.from({length: 5}, (_, i) => {
        const filled = i < (data.rating || 0);
        return `<span class="star ${filled ? '' : 'empty'}">★</span>`;
    }).join('');
    
    // Create feature tags
    const featureTags = (data.features || []).map(feature => {
        const featureNames = {
            'well-lit': 'Well Lit',
            'police-presence': 'Police Presence',
            'cctv': 'CCTV',
            'crowded': 'Crowded',
            'security-guards': 'Security',
            'emergency-services': 'Emergency Services'
        };
        return `<span class="feature-tag">${featureNames[feature] || feature}</span>`;
    }).join('');
    
    return `
        <div class="review-card">
            <div class="review-category ${data.category || 'general'}">${data.category || 'General'}</div>
            
            <div class="review-header">
                <div class="review-author">
                    <div class="author-avatar">${authorInitial}</div>
                    <div class="author-info">
                        <h5>${authorName}</h5>
                        <small>${timeAgo}</small>
                    </div>
                </div>
                <div class="review-rating">
                    <div class="review-stars">${stars}</div>
                    <span class="rating-text">${data.rating || 0}/5</span>
                </div>
            </div>
            
            <div class="review-location">📍 ${data.location || 'Location not specified'}</div>
            
            <div class="review-title">${data.title || 'No title'}</div>
            <div class="review-description">${data.description || review.message}</div>
            
            ${featureTags ? `<div class="review-features">${featureTags}</div>` : ''}
            
            ${data.tips ? `
                <div class="review-tips">
                    <strong>💡 Safety Tips:</strong>
                    ${data.tips}
                </div>
            ` : ''}
            
            <div class="review-footer">
                <div class="review-actions">
                    <button class="review-action" onclick="likeReview('${review.id}')">
                        <i class="fas fa-thumbs-up"></i>
                        <span>Helpful (0)</span>
                    </button>
                    <button class="review-action" onclick="reportReview('${review.id}')">
                        <i class="fas fa-flag"></i>
                        <span>Report</span>
                    </button>
                </div>
                <div class="review-time">${timeAgo}</div>
            </div>
        </div>
    `;
}

// Setup Review Interactions
function setupReviewInteractions() {
    // Filter functionality
    const filterSelect = document.getElementById('review-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            filterReviews(this.value);
        });
    }
}

// Filter Reviews
function filterReviews(filterValue) {
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach(card => {
        const rating = parseInt(card.querySelector('.rating-text').textContent);
        let show = true;
        
        switch(filterValue) {
            case '5':
                show = rating === 5;
                break;
            case '4':
                show = rating >= 4;
                break;
            case '3':
                show = rating >= 3;
                break;
            case 'recent':
                // Already sorted by recent, just show all
                show = true;
                break;
            default:
                show = true;
        }
        
        card.style.display = show ? 'block' : 'none';
    });
}

// Load Nearby Reviews
async function loadNearbyReviews() {
    const nearbyList = document.getElementById('nearby-reviews-list');
    if (!nearbyList) return;
    
    nearbyList.innerHTML = `
        <div class="reviews-loading">
            <i class="fas fa-spinner fa-spin"></i>
            Loading nearby reviews...
        </div>
    `;
    
    try {
        // Get current location first
        if (!navigator.geolocation) {
            nearbyList.innerHTML = `
                <div class="empty-reviews">
                    <i class="fas fa-location-slash"></i>
                    <h4>Location not available</h4>
                    <p>Enable location access to see nearby reviews.</p>
                </div>
            `;
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const radius = parseInt(document.getElementById('search-radius').value) || 5;
                
                // Get all reviews and filter by distance
                let allReviews = [];
                if (window.firebaseDataManager && window.firebaseDataManager.isInitialized) {
                    const communityUpdates = await window.firebaseDataManager.getCommunityUpdates(100);
                    allReviews = communityUpdates.filter(update => update.type === 'area_review');
                } else {
                    const communityUpdates = window.rakshitaData.getCommunityUpdates(100);
                    allReviews = communityUpdates.filter(update => update.type === 'area_review');
                }
                
                // Filter reviews within radius
                const nearbyReviews = allReviews.filter(review => {
                    if (!review.data || !review.data.coordinates) return false;
                    
                    const distance = calculateDistance(
                        userLat, userLng,
                        review.data.coordinates.latitude,
                        review.data.coordinates.longitude
                    );
                    
                    return distance <= radius;
                });
                
                if (nearbyReviews.length === 0) {
                    nearbyList.innerHTML = `
                        <div class="empty-reviews">
                            <i class="fas fa-map-marker-alt"></i>
                            <h4>No nearby reviews</h4>
                            <p>No reviews found within ${radius} km of your location.</p>
                        </div>
                    `;
                    return;
                }
                
                // Sort by distance
                nearbyReviews.sort((a, b) => {
                    const distA = calculateDistance(userLat, userLng, a.data.coordinates.latitude, a.data.coordinates.longitude);
                    const distB = calculateDistance(userLat, userLng, b.data.coordinates.latitude, b.data.coordinates.longitude);
                    return distA - distB;
                });
                
                nearbyList.innerHTML = nearbyReviews.map(review => {
                    const distance = calculateDistance(
                        userLat, userLng,
                        review.data.coordinates.latitude,
                        review.data.coordinates.longitude
                    );
                    
                    return createNearbyReviewCard(review, distance);
                }).join('');
            },
            (error) => {
                nearbyList.innerHTML = `
                    <div class="empty-reviews">
                        <i class="fas fa-location-slash"></i>
                        <h4>Location access needed</h4>
                        <p>Please enable location access to see nearby reviews.</p>
                    </div>
                `;
            }
        );
        
    } catch (error) {
        console.error('Error loading nearby reviews:', error);
        nearbyList.innerHTML = `
            <div class="empty-reviews">
                <i class="fas fa-exclamation-triangle"></i>
                <h4>Error loading reviews</h4>
                <p>Please try again later.</p>
            </div>
        `;
    }
}

// Create Nearby Review Card
function createNearbyReviewCard(review, distance) {
    const reviewCard = createReviewCard(review);
    const distanceInfo = `<div class="review-distance">📍 ${distance.toFixed(1)} km away</div>`;
    
    // Insert distance info after location
    return reviewCard.replace(
        '<div class="review-location">',
        distanceInfo + '<div class="review-location">'
    );
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Review Actions
function likeReview(reviewId) {
    // Implement like functionality
    showNotification('Thank you for your feedback!', 'success');
}

function reportReview(reviewId) {
    if (confirm('Are you sure you want to report this review?')) {
        showNotification('Review reported. Thank you for keeping our community safe.', 'info');
    }
}

// Load Community Feed
function loadCommunityFeed() {
    const feedContainer = document.querySelector('#community-feed-tab .community-feed-full');
    if (!feedContainer) return;
    
    // This function can be enhanced to load real community updates
    // For now, it shows the existing static content
}

// Setup radius selector for nearby reviews
document.addEventListener('DOMContentLoaded', function() {
    const radiusSelector = document.getElementById('search-radius');
    if (radiusSelector) {
        radiusSelector.addEventListener('change', function() {
            loadNearbyReviews();
        });
    }
});
// Debug function to test community tabs
function testCommunityTabs() {
    console.log('=== Community Tabs Debug ===');
    
    const tabs = document.querySelectorAll('.community-tab');
    const tabContents = document.querySelectorAll('.community-tab-content');
    
    console.log('Tabs found:', tabs.length);
    tabs.forEach((tab, i) => {
        console.log(`Tab ${i}:`, tab.dataset.tab, tab.textContent.trim());
    });
    
    console.log('Tab contents found:', tabContents.length);
    tabContents.forEach((content, i) => {
        console.log(`Content ${i}:`, content.id, content.classList.contains('active') ? 'ACTIVE' : 'inactive');
    });
    
    // Test clicking the first tab
    if (tabs.length > 0) {
        console.log('Testing click on first tab...');
        tabs[0].click();
    }
}

// Manual tab switching functions for testing
function switchToReviews() {
    console.log('Manually switching to reviews tab...');
    const reviewsTab = document.querySelector('[data-tab="reviews"]');
    if (reviewsTab) {
        reviewsTab.click();
    } else {
        console.error('Reviews tab not found!');
    }
}

function switchToWriteReview() {
    console.log('Manually switching to write review tab...');
    const writeTab = document.querySelector('[data-tab="write-review"]');
    if (writeTab) {
        writeTab.click();
    } else {
        console.error('Write review tab not found!');
    }
}

function switchToNearby() {
    console.log('Manually switching to nearby tab...');
    const nearbyTab = document.querySelector('[data-tab="nearby"]');
    if (nearbyTab) {
        nearbyTab.click();
    } else {
        console.error('Nearby tab not found!');
    }
}

// Add these functions to window for console testing
window.testCommunityTabs = testCommunityTabs;
window.switchToReviews = switchToReviews;
window.switchToWriteReview = switchToWriteReview;
window.switchToNearby = switchToNearby;

// Utility Functions
async function getRealAddress(latitude, longitude) {
    try {
        // Using a free geocoding service (you can replace with your preferred service)
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await response.json();
        
        if (data && data.display_name) {
            return data.display_name;
        } else if (data && data.locality) {
            return `${data.locality}, ${data.principalSubdivision}, ${data.countryName}`;
        } else {
            return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        }
    } catch (error) {
        console.error('Geocoding error:', error);
        return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    }
}

function updateLocationStatus(accuracy) {
    const statusElement = document.getElementById('location-status');
    if (!statusElement) return;
    
    let status, color;
    if (accuracy <= 10) {
        status = 'High Precision GPS';
        color = '#10b981';
    } else if (accuracy <= 50) {
        status = 'Good GPS Signal';
        color = '#f59e0b';
    } else {
        status = 'Low GPS Accuracy';
        color = '#ef4444';
    }
    
    statusElement.textContent = status;
    statusElement.style.color = color;
}

function handleLocationError(error) {
    const statusElement = document.getElementById('location-status');
    const coordsElement = document.getElementById('current-coords');
    const addressElement = document.getElementById('current-address');
    
    let errorMessage;
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location unavailable';
            break;
        case error.TIMEOUT:
            errorMessage = 'Location request timeout';
            break;
        default:
            errorMessage = 'Location error occurred';
            break;
    }
    
    if (statusElement) {
        statusElement.textContent = errorMessage;
        statusElement.style.color = '#ef4444';
    }
    
    if (coordsElement) {
        coordsElement.textContent = 'Location unavailable';
    }
    
    if (addressElement) {
        addressElement.textContent = 'Enable location access for full functionality';
    }
}

// Debug helper functions for community tabs
function switchToReviews() {
    console.log('Switching to reviews tab...');
    const reviewsTab = document.querySelector('[data-tab="reviews"]');
    if (reviewsTab) {
        reviewsTab.click();
    } else {
        console.error('Reviews tab not found');
    }
}

function switchToWriteReview() {
    console.log('Switching to write review tab...');
    const writeTab = document.querySelector('[data-tab="write-review"]');
    if (writeTab) {
        writeTab.click();
    } else {
        console.error('Write review tab not found');
    }
}

function switchToNearby() {
    console.log('Switching to nearby tab...');
    const nearbyTab = document.querySelector('[data-tab="nearby"]');
    if (nearbyTab) {
        nearbyTab.click();
    } else {
        console.error('Nearby tab not found');
    }
}

// Enhanced celebration effects
function createCelebration() {
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
    
    // Add success sound effect (optional)
    try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
        audio.play().catch(() => {}); // Ignore if audio fails
    } catch (error) {
        // Audio not supported, continue without sound
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        top: -10px;
        z-index: 10000;
        pointer-events: none;
        animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
}

// Add confetti animation CSS
if (!document.querySelector('#confetti-styles')) {
    const style = document.createElement('style');
    style.id = 'confetti-styles';
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        
        @keyframes iconBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        .scroll-indicator {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--gradient-primary);
            z-index: 9999;
            transition: width 0.1s ease;
        }
        
        .section-reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .section-reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Initialize scroll indicator
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.scroll-indicator')) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        document.body.appendChild(scrollIndicator);
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollIndicator.style.width = scrollPercent + '%';
        });
    }
});

console.log('🚀 Rakshita Safety Companion loaded successfully!');
console.log('📱 Features: Location Tracking, Emergency SOS, Community Reviews, Safe Routes');
console.log('🔥 Firebase Integration: ' + (window.firebaseDataManager?.isInitialized ? 'Active' : 'Initializing...'));
// Global helper functions for community features
window.clearReviewForm = clearEnhancedReviewForm;
window.markReviewHelpful = markReviewHelpful;
window.shareReview = shareReview;
window.reportReview = reportReview;
window.loadEnhancedAreaReviews = loadEnhancedAreaReviews;
window.loadEnhancedNearbyReviews = loadEnhancedNearbyReviews;

// Enhanced notification system for community features
function showEnhancedNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Enhanced notification content with better styling
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${getNotificationIcon(type)}
            </div>
            <div class="notification-text">
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add enhanced notification styles if not already added
    if (!document.querySelector('#enhanced-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'enhanced-notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 3000;
                max-width: 400px;
                min-width: 300px;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                animation: slideInRight 0.3s ease;
                backdrop-filter: blur(10px);
            }
            
            .notification.success {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
            }
            
            .notification.info {
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                color: white;
            }
            
            .notification.error {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
            }
            
            .notification.emergency {
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
                animation: shake 0.5s ease-in-out, slideInRight 0.3s ease;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem 1.5rem;
            }
            
            .notification-icon {
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            
            .notification-text {
                flex: 1;
                font-weight: 500;
                line-height: 1.4;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.2rem;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.3s ease;
                padding: 0.25rem;
                border-radius: 4px;
                flex-shrink: 0;
            }
            
            .notification-close:hover {
                opacity: 1;
                background: rgba(255, 255, 255, 0.1);
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
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
                20%, 40%, 60%, 80% { transform: translateX(3px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        success: '<i class="fas fa-check-circle"></i>',
        info: '<i class="fas fa-info-circle"></i>',
        error: '<i class="fas fa-exclamation-circle"></i>',
        emergency: '<i class="fas fa-exclamation-triangle"></i>'
    };
    return icons[type] || icons.info;
}

// Override the existing showNotification for enhanced experience
const originalShowNotification = window.showNotification;
window.showNotification = function(message, type = 'info', duration = 5000) {
    // Use enhanced notification for community features
    if (message.includes('Review') || message.includes('Community') || message.includes('Location')) {
        showEnhancedNotification(message, type, duration);
    } else if (originalShowNotification) {
        originalShowNotification(message, type);
    } else {
        showEnhancedNotification(message, type, duration);
    }
};

// Enhanced mobile responsiveness handler
function handleMobileResize() {
    const isMobile = window.innerWidth <= 768;
    const communityTabs = document.querySelectorAll('.community-tab');
    
    communityTabs.forEach(tab => {
        const span = tab.querySelector('span');
        if (span) {
            if (isMobile && window.innerWidth <= 480) {
                span.style.display = 'none';
            } else {
                span.style.display = '';
            }
        }
    });
}

// Add resize listener for mobile responsiveness
window.addEventListener('resize', handleMobileResize);
document.addEventListener('DOMContentLoaded', handleMobileResize);

console.log('🎉 Enhanced Community Features loaded successfully!');
console.log('✨ Features: Area Reviews, Nearby Reviews, Community Feed, Enhanced UI');
console.log('📱 Fully responsive design with mobile optimization');
// Additional Safety Zone Management Functions

function openManualLocationDialog() {
    const dialog = document.createElement('div');
    dialog.className = 'modal-overlay';
    dialog.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3>Set Location Manually</h3>
                <button class="close-btn" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Latitude:</label>
                    <input type="number" id="manual-lat" step="any" placeholder="e.g., 28.6139">
                </div>
                <div class="form-group">
                    <label>Longitude:</label>
                    <input type="number" id="manual-lng" step="any" placeholder="e.g., 77.2090">
                </div>
                <div class="form-group">
                    <label>Address (optional):</label>
                    <input type="text" id="manual-address" placeholder="Enter address or landmark">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                <button class="btn-primary" onclick="setManualLocation()">Set Location</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
}

function setManualLocation() {
    const lat = parseFloat(document.getElementById('manual-lat').value);
    const lng = parseFloat(document.getElementById('manual-lng').value);
    const address = document.getElementById('manual-address').value;
    
    if (isNaN(lat) || isNaN(lng)) {
        showNotification('Please enter valid coordinates', 'error');
        return;
    }
    
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        showNotification('Please enter valid coordinate ranges', 'error');
        return;
    }
    
    currentLocation = {
        latitude: lat,
        longitude: lng,
        accuracy: 1000, // Manual location has lower accuracy
        timestamp: new Date().toISOString(),
        manual: true
    };
    
    updateLocationDisplay();
    updateCurrentZoneStatus();
    
    // Override address if provided
    if (address) {
        const addressDisplay = document.getElementById('address-display');
        if (addressDisplay) {
            addressDisplay.textContent = address;
        }
    }
    
    showNotification('Location set manually', 'success');
    document.querySelector('.modal-overlay').remove();
}

function openCreateZoneDialog() {
    if (!currentLocation) {
        showNotification('Please enable location first to create zones', 'warning');
        return;
    }
    
    const dialog = document.createElement('div');
    dialog.className = 'modal-overlay';
    dialog.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Create Safety Zone</h3>
                <button class="close-btn" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Zone Name:</label>
                    <input type="text" id="zone-name" placeholder="e.g., Safe Coffee Shop">
                </div>
                <div class="form-group">
                    <label>Zone Type:</label>
                    <select id="zone-type">
                        <option value="safe">✅ Safe Zone</option>
                        <option value="warning">⚠️ Caution Zone</option>
                        <option value="danger">🚨 Danger Zone</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Description:</label>
                    <textarea id="zone-description" rows="3" placeholder="Describe what makes this area safe/unsafe..."></textarea>
                </div>
                <div class="form-group">
                    <label>Radius: <span id="zone-radius-value">200</span>m</label>
                    <input type="range" id="zone-radius" min="50" max="1000" value="200" step="50">
                </div>
                <div class="form-group">
                    <label>Location:</label>
                    <div style="display: flex; gap: 1rem;">
                        <input type="number" id="zone-lat" step="any" value="${currentLocation.latitude}" placeholder="Latitude">
                        <input type="number" id="zone-lng" step="any" value="${currentLocation.longitude}" placeholder="Longitude">
                    </div>
                    <small style="color: #6b7280;">Current location is pre-filled. Adjust if needed.</small>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                <button class="btn-primary" onclick="createSafetyZone()">Create Zone</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    // Setup radius slider
    const radiusSlider = document.getElementById('zone-radius');
    const radiusValue = document.getElementById('zone-radius-value');
    
    radiusSlider.addEventListener('input', function() {
        radiusValue.textContent = this.value;
    });
}

function createSafetyZone() {
    const name = document.getElementById('zone-name').value.trim();
    const type = document.getElementById('zone-type').value;
    const description = document.getElementById('zone-description').value.trim();
    const radius = parseInt(document.getElementById('zone-radius').value);
    const lat = parseFloat(document.getElementById('zone-lat').value);
    const lng = parseFloat(document.getElementById('zone-lng').value);
    
    if (!name || !description) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (isNaN(lat) || isNaN(lng)) {
        showNotification('Please enter valid coordinates', 'error');
        return;
    }
    
    const newZone = {
        id: 'user-' + Date.now(),
        name: name,
        type: type,
        description: description,
        latitude: lat,
        longitude: lng,
        radius: radius,
        createdBy: 'user',
        createdAt: new Date().toISOString()
    };
    
    safetyZones.push(newZone);
    saveSafetyZones();
    
    showNotification(`Safety zone "${name}" created successfully!`, 'success');
    document.querySelector('.modal-overlay').remove();
    
    // Refresh displays
    updateCurrentZoneStatus();
    loadUserZones();
}

function loadUserZones() {
    const userZonesContainer = document.getElementById('user-zones');
    if (!userZonesContainer) return;
    
    const userZones = safetyZones.filter(zone => zone.createdBy === 'user');
    
    if (userZones.length === 0) {
        userZonesContainer.innerHTML = `
            <div class="empty-zones">
                <i class="fas fa-map-marker-alt"></i>
                <h4>No Custom Zones</h4>
                <p>Create your first safety zone to get started</p>
                <button class="btn-primary" onclick="openCreateZoneDialog()">
                    <i class="fas fa-plus"></i> Create Zone
                </button>
            </div>
        `;
        return;
    }
    
    userZonesContainer.innerHTML = userZones.map(zone => `
        <div class="user-zone-card">
            <div class="zone-card-header">
                <h4 class="zone-card-title">${zone.name}</h4>
                <span class="zone-card-type ${zone.type}">${zone.type}</span>
            </div>
            <p class="zone-card-description">${zone.description}</p>
            <div class="zone-card-meta">
                <small>Radius: ${zone.radius}m</small>
                <small>Created: ${new Date(zone.createdAt).toLocaleDateString()}</small>
            </div>
            <div class="zone-card-actions">
                <button onclick="editZone('${zone.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button onclick="deleteZone('${zone.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
                <button onclick="navigateToZone('${zone.id}')">
                    <i class="fas fa-directions"></i> Navigate
                </button>
            </div>
        </div>
    `).join('');
}

function deleteZone(zoneId) {
    const zone = safetyZones.find(z => z.id === zoneId);
    if (!zone) return;
    
    if (confirm(`Are you sure you want to delete "${zone.name}"?`)) {
        safetyZones = safetyZones.filter(z => z.id !== zoneId);
        saveSafetyZones();
        showNotification('Zone deleted successfully', 'success');
        loadUserZones();
        updateCurrentZoneStatus();
    }
}

function editZone(zoneId) {
    const zone = safetyZones.find(z => z.id === zoneId);
    if (!zone) return;
    
    // Pre-fill the create dialog with existing zone data
    const dialog = document.createElement('div');
    dialog.className = 'modal-overlay';
    dialog.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div class="modal-header">
                <h3>Edit Safety Zone</h3>
                <button class="close-btn" onclick="this.closest('.modal-overlay').remove()">×</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Zone Name:</label>
                    <input type="text" id="zone-name" value="${zone.name}">
                </div>
                <div class="form-group">
                    <label>Zone Type:</label>
                    <select id="zone-type">
                        <option value="safe" ${zone.type === 'safe' ? 'selected' : ''}>✅ Safe Zone</option>
                        <option value="warning" ${zone.type === 'warning' ? 'selected' : ''}>⚠️ Caution Zone</option>
                        <option value="danger" ${zone.type === 'danger' ? 'selected' : ''}>🚨 Danger Zone</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Description:</label>
                    <textarea id="zone-description" rows="3">${zone.description}</textarea>
                </div>
                <div class="form-group">
                    <label>Radius: <span id="zone-radius-value">${zone.radius}</span>m</label>
                    <input type="range" id="zone-radius" min="50" max="1000" value="${zone.radius}" step="50">
                </div>
                <div class="form-group">
                    <label>Location:</label>
                    <div style="display: flex; gap: 1rem;">
                        <input type="number" id="zone-lat" step="any" value="${zone.latitude}">
                        <input type="number" id="zone-lng" step="any" value="${zone.longitude}">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                <button class="btn-primary" onclick="updateSafetyZone('${zoneId}')">Update Zone</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    // Setup radius slider
    const radiusSlider = document.getElementById('zone-radius');
    const radiusValue = document.getElementById('zone-radius-value');
    
    radiusSlider.addEventListener('input', function() {
        radiusValue.textContent = this.value;
    });
}

function updateSafetyZone(zoneId) {
    const name = document.getElementById('zone-name').value.trim();
    const type = document.getElementById('zone-type').value;
    const description = document.getElementById('zone-description').value.trim();
    const radius = parseInt(document.getElementById('zone-radius').value);
    const lat = parseFloat(document.getElementById('zone-lat').value);
    const lng = parseFloat(document.getElementById('zone-lng').value);
    
    if (!name || !description) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (isNaN(lat) || isNaN(lng)) {
        showNotification('Please enter valid coordinates', 'error');
        return;
    }
    
    const zoneIndex = safetyZones.findIndex(z => z.id === zoneId);
    if (zoneIndex === -1) return;
    
    safetyZones[zoneIndex] = {
        ...safetyZones[zoneIndex],
        name: name,
        type: type,
        description: description,
        latitude: lat,
        longitude: lng,
        radius: radius,
        updatedAt: new Date().toISOString()
    };
    
    saveSafetyZones();
    
    showNotification(`Safety zone "${name}" updated successfully!`, 'success');
    document.querySelector('.modal-overlay').remove();
    
    // Refresh displays
    updateCurrentZoneStatus();
    loadUserZones();
}

function navigateToZone(zoneId) {
    const zone = safetyZones.find(z => z.id === zoneId);
    if (!zone) return;
    
    const url = `https://www.google.com/maps/dir/?api=1&destination=${zone.latitude},${zone.longitude}`;
    window.open(url, '_blank');
}

function importSafetyZones() {
    showNotification('Zone import feature coming soon!', 'info');
}

// Add modal styles if not already present
if (!document.querySelector('#modal-styles')) {
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 4000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            box-shadow: var(--shadow-xl);
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .modal-header h3 {
            margin: 0;
            color: var(--text-primary);
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-secondary);
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            padding: 1.5rem;
            border-top: 1px solid var(--border-color);
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: var(--text-primary);
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-size: 0.9rem;
            font-family: inherit;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .zone-card-meta {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}
// Enhanced Live Tracking Functions

// Location history for trail visualization
let locationHistory = [];
const maxHistoryItems = 10;

function updateLiveLocation(position) {
    const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        speed: position.coords.speed,
        heading: position.coords.heading,
        timestamp: new Date().toISOString()
    };
    
    console.log('📍 Live location update:', newLocation);
    debugLog(`Location update: ${newLocation.latitude.toFixed(6)}, ${newLocation.longitude.toFixed(6)}`);
    
    // Update current location
    lastKnownLocation = newLocation;
    
    // Add to history
    addToLocationHistory(newLocation);
    
    // Update UI elements
    updateLiveLocationDisplay(newLocation);
    updateTrackingStats(newLocation);
    updateMapVisualization(newLocation);
    updateLocationHistory();
    
    // Save to storage
    saveLocationData(newLocation);
    
    // Check for zone alerts if safety zones are active
    if (typeof checkZoneAlerts === 'function') {
        checkZoneAlerts(newLocation);
    }
}

function updateLiveLocationDisplay(location) {
    // Update coordinates
    const coordsElement = document.getElementById('current-coords');
    if (coordsElement) {
        coordsElement.textContent = `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
    }
    
    // Update address
    updateAddressFromLocation(location);
    
    // Update location meta info
    const metaElement = document.getElementById('location-meta');
    if (metaElement) {
        const accuracy = Math.round(location.accuracy);
        const timestamp = new Date(location.timestamp).toLocaleTimeString();
        
        metaElement.innerHTML = `
            <small>
                Accuracy: ±${accuracy}m | Updated: ${timestamp}
                ${location.speed ? ` | Speed: ${(location.speed * 3.6).toFixed(1)} km/h` : ''}
            </small>
        `;
    }
}

function updateTrackingStats(location) {
    // Update last update time
    const lastUpdateElement = document.getElementById('last-update');
    if (lastUpdateElement) {
        lastUpdateElement.textContent = 'Just now';
    }
    
    // Update accuracy
    const accuracyElement = document.getElementById('tracking-accuracy');
    if (accuracyElement) {
        const accuracy = Math.round(location.accuracy);
        accuracyElement.textContent = `±${accuracy}m`;
        
        // Color code accuracy
        if (accuracy <= 10) {
            accuracyElement.style.color = '#10b981';
        } else if (accuracy <= 50) {
            accuracyElement.style.color = '#f59e0b';
        } else {
            accuracyElement.style.color = '#ef4444';
        }
    }
    
    // Update speed
    const speedElement = document.getElementById('current-speed');
    if (speedElement) {
        if (location.speed && location.speed > 0) {
            const speedKmh = (location.speed * 3.6).toFixed(1);
            speedElement.textContent = `${speedKmh} km/h`;
        } else {
            speedElement.textContent = '0 km/h';
        }
    }
}

function updateMapVisualization(location) {
    const userLocationElement = document.getElementById('user-location-dot');
    if (userLocationElement) {
        // Add tracking animation
        userLocationElement.classList.add('tracking');
        userLocationElement.style.background = '#10b981';
        
        // Add trail dot
        addTrailDot(location);
    }
}

function addTrailDot(location) {
    const trailContainer = document.getElementById('tracking-trail');
    if (!trailContainer) return;
    
    const trailDot = document.createElement('div');
    trailDot.className = 'trail-dot';
    
    // Position randomly around the center for demo
    const centerX = 50;
    const centerY = 50;
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    
    trailDot.style.left = `${centerX + offsetX}%`;
    trailDot.style.top = `${centerY + offsetY}%`;
    
    trailContainer.appendChild(trailDot);
    
    // Remove after animation
    setTimeout(() => {
        if (trailDot.parentElement) {
            trailDot.remove();
        }
    }, 10000);
}

function addToLocationHistory(location) {
    locationHistory.unshift({
        ...location,
        id: Date.now()
    });
    
    // Keep only recent items
    if (locationHistory.length > maxHistoryItems) {
        locationHistory = locationHistory.slice(0, maxHistoryItems);
    }
}

function updateLocationHistory() {
    const historyContainer = document.getElementById('location-history');
    if (!historyContainer) return;
    
    if (locationHistory.length === 0) {
        historyContainer.innerHTML = '<p style="color: #6b7280; text-align: center;">No location history yet</p>';
        return;
    }
    
    historyContainer.innerHTML = locationHistory.map(location => {
        const time = new Date(location.timestamp).toLocaleTimeString();
        const coords = `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`;
        
        return `
            <div class="history-item">
                <span class="history-time">${time}</span>
                <span class="history-location">${coords}</span>
            </div>
        `;
    }).join('');
}

// Map control functions
function centerMap() {
    const userLocationElement = document.getElementById('user-location-dot');
    if (userLocationElement) {
        // Animate centering
        userLocationElement.style.transform = 'translate(-50%, -50%) scale(1.2)';
        setTimeout(() => {
            userLocationElement.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 300);
    }
    
    showNotification('Map centered on current location', 'info');
}

function toggleTrail() {
    const trailContainer = document.getElementById('tracking-trail');
    if (trailContainer) {
        if (trailContainer.style.display === 'none') {
            trailContainer.style.display = 'block';
            showNotification('Location trail enabled', 'success');
        } else {
            trailContainer.style.display = 'none';
            showNotification('Location trail disabled', 'info');
        }
    }
}

// Setup refresh button
function setupTrackingControls() {
    const refreshBtn = document.getElementById('refresh-tracking');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
            this.disabled = true;
            
            // Force location refresh
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        updateLiveLocation(position);
                        showNotification('Location refreshed successfully!', 'success');
                        
                        this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
                        this.disabled = false;
                    },
                    (error) => {
                        handleTrackingError(error);
                        this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
                        this.disabled = false;
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            }
        });
    }
}

// Enhanced initialization
function initializeLocationTracking() {
    console.log('🎯 Initializing Enhanced Live Location Tracking...');
    
    const trackingToggle = document.getElementById('tracking-toggle');
    if (trackingToggle) {
        trackingToggle.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                // Stop tracking
                stopLiveTracking();
                this.classList.remove('active');
                this.innerHTML = '<i class="fas fa-play"></i> Resume Tracking';
                this.style.background = '#f59e0b';
                showNotification('Location tracking paused', 'info');
            } else {
                // Start tracking
                startLiveTracking();
                this.classList.add('active');
                this.innerHTML = '<i class="fas fa-pause"></i> Pause Tracking';
                this.style.background = '#10b981';
                showNotification('Location tracking resumed', 'success');
            }
        });
    }
    
    // Setup other controls
    setupTrackingControls();
    
    // Auto-start tracking when section is opened
    startLiveTracking();
    
    console.log('✅ Enhanced live tracking initialized');
}

// Update the status indicator
function updateTrackingStatus(status) {
    const statusIndicator = document.getElementById('tracking-status');
    const statusDot = statusIndicator?.querySelector('.status-dot');
    const statusText = statusIndicator?.querySelector('span');
    
    if (statusDot && statusText) {
        statusDot.className = `status-dot ${status}`;
        
        switch(status) {
            case 'active':
                statusText.textContent = 'Active';
                break;
            case 'paused':
                statusText.textContent = 'Paused';
                break;
            case 'error':
                statusText.textContent = 'Error';
                break;
        }
    }
    
    // Update sharing status
    const statusElements = document.querySelectorAll('.contact-item .status');
    statusElements.forEach(element => {
        if (status === 'active') {
            element.textContent = 'Active';
            element.className = 'status active';
        } else {
            element.textContent = 'Paused';
            element.className = 'status paused';
        }
    });
}

// Make functions globally available
window.centerMap = centerMap;
window.toggleTrail = toggleTrail;

console.log('✅ Enhanced Live Tracking System loaded successfully!');