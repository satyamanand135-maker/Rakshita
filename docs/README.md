# 🛡️ Rakshita - Smart Travel Safety Companion

> **Your intelligent travel safety companion powered by AI and real-time monitoring**

Rakshita is a comprehensive web application that provides AI-powered safety monitoring, geo-fencing alerts, safe route planning, and community-driven safety insights for travelers. Built with modern web technologies and designed for both travelers and authorities.

![Rakshita Dashboard](https://img.shields.io/badge/Status-Active%20Development-brightgreen)
![Version](https://img.shields.io/badge/Version-2.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Key Features

### 🎯 For Travelers
- **🗺️ Real-time Location Tracking** - Precise GPS monitoring with intelligent sharing
- **🚨 One-tap SOS System** - Instant emergency alerts to authorities and contacts
- **🛡️ Geo-fence Safety Alerts** - Smart boundaries warning about high-risk areas
- **🤖 AI-Powered Threat Detection** - Machine learning for predictive safety analysis
- **🛣️ Enhanced Safe Route Planning** - Intelligent routing with place name input and interactive maps
- **👥 Community Safety Network** - Connect with travelers and safety ambassadors

### 🆕 NEW: Enhanced Safe Routes System
- **📍 Place Name Input**: Simply enter "India Gate" or "Airport" - no coordinates needed!
- **🗺️ Interactive Maps**: Visual route preview with safety zones and navigation interface
- **🎯 Multiple Route Options**: Safest (95% safe), Balanced (85% safe), and Fastest routes
- **🧠 AI Safety Scoring**: Real-time analysis of lighting, police presence, and crime data
- **🧭 Full Navigation**: Turn-by-turn guidance with emergency features built-in

### 🚨 NEW: Emergency SOS Calling System
- **📱 Mobile Auto-Dial**: Automatically calls 112, 100, 108 on mobile devices
- **💻 Laptop Support**: Shows numbers with copy-to-clipboard for manual dialing
- **⏱️ 5-Second Countdown**: Prevents accidental activation with cancel option
- **📍 Location Sharing**: Automatically shares GPS coordinates with emergency services
- **👥 Personal Contacts**: Add and manage your own emergency contacts
- **🔄 Multi-Platform**: Works seamlessly on both mobile and desktop devices

### 🚔 For Authorities
- **📊 Live Monitoring Dashboard** - Real-time tourist movement and safety status
- **⚡ Emergency Response System** - Instant notifications with precise location data
- **📈 Predictive Analytics** - AI-driven insights for incident prevention
- **🎯 Safety Command Center** - Comprehensive overview of jurisdiction safety

## 🚀 Quick Start

### Option 1: Direct Download
1. Download the project files
2. Open `index.html` in your browser
3. Start exploring the features!

### Option 2: HTTPS Server (Recommended)
```bash
# Run the included HTTPS server
python https_server.py

# Access at: https://localhost:8443
```

### Option 3: Live Server
```bash
# If you have Node.js installed
npx live-server --https

# Or use any local server of your choice
```

## 🛣️ Enhanced Safe Routes - How to Use

### 🎯 Try the Enhanced Demo
Visit: `https://localhost:8443/enhanced-safe-routes-demo.html`

### 🚨 Try the Emergency SOS Demo
Visit: `https://localhost:8443/emergency-sos-demo.html`

### 📚 Feature Guides & Tutorials
Each feature has a dedicated guide with step-by-step instructions and visual examples:

- **📍 Location Tracking**: `https://localhost:8443/location-tracking-guide.html`
- **🛡️ Geo-Fencing**: `https://localhost:8443/geofencing-guide.html`
- **🚨 Emergency SOS**: `https://localhost:8443/emergency-sos-guide.html`
- **🤖 AI Threat Detection**: `https://localhost:8443/ai-threat-detection-guide.html`
- **🛣️ Safe Route Planning**: `https://localhost:8443/safe-route-planning-guide.html`
- **👥 Community Network**: `https://localhost:8443/community-safety-guide.html`
- **🚔 Authorities Dashboard**: `https://localhost:8443/authorities-dashboard-guide.html`

### 📞 Emergency SOS Features
**On Mobile Devices:**
- Automatically opens phone dialer with emergency numbers
- Calls 112 (Emergency Services), 100 (Police), 108 (Ambulance), 101 (Fire)
- Calls your personal emergency contacts
- Shares GPS location automatically

**On Laptops/Desktops:**
- Displays emergency numbers with large, clear text
- Copy-to-clipboard functionality for easy dialing
- Shows your location coordinates for emergency services
- Manages personal emergency contacts

**Universal Features:**
- 5-second countdown with cancel option
- Automatic location capture and sharing
- Personal emergency contact management
- Activity logging for emergency services

### 📍 Simple Place Name Input
Instead of coordinates, just enter:
- **Popular Places**: "India Gate", "Red Fort", "Connaught Place"
- **Transportation**: "Airport", "Railway Station", "Metro Station"
- **Services**: "Hospital", "University", "Mall", "Market"

### 🗺️ Get Multiple Route Options
1. **Safest Route** (95% Safety Score)
   - Well-lit main roads
   - High police patrol areas
   - CCTV coverage
   - May take 15% longer

2. **Balanced Route** (85% Safety Score)
   - Mix of main and side roads
   - Moderate lighting and traffic
   - Good compromise of speed and safety

3. **Fastest Route** (70% Safety Score)
   - Direct path with warnings
   - Some poorly lit sections
   - Not recommended after dark

### 🧭 Interactive Features
- **View on Map**: See route with safety zones highlighted
- **Start Navigation**: Full-screen turn-by-turn guidance
- **Save Routes**: Bookmark frequently used paths
- **Share Routes**: Send safe routes to contacts
- **Emergency Mode**: One-tap SOS during navigation

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure and accessibility |
| **CSS3** | Modern styling with Grid, Flexbox, animations |
| **JavaScript** | Interactive functionality and real-time features |
| **Firebase** | Backend services and real-time database |
| **PWA** | Progressive Web App capabilities |
| **Geolocation API** | GPS tracking and location services |

## 📱 Project Structure

```
Rakshita/
├── 📄 index.html                    # Main landing page
├── 🎨 styles.css                    # Complete styling
├── ⚡ script.js                     # Core functionality
├── 🔥 firebase-config.js            # Firebase configuration
├── 📊 firebase-data-manager.js      # Data management
├── 👥 community.js                  # Community features
├── 📍 enhanced-location-manager.js  # Location services
├── 🔒 https_server.py              # Development server
├── 🧪 Test Files/
│   ├── accuracy-test.html
│   ├── gps-diagnostic.html
│   └── various testing utilities
└── 📚 Documentation/
    ├── firebase-setup-guide.md
    ├── firebase-quick-start.md
    └── firestore-edition-guide.md
```

## 🎮 Interactive Features

### 🖥️ Dashboard Sections
- **📊 Overview** - Safety status and activity feed
- **📍 Live Tracking** - Real-time location monitoring
- **🛡️ Safety Zones** - Geo-fence management
- **🚨 Emergency** - SOS and emergency contacts
- **🛣️ Safe Routes** - AI-powered route planning
- **👥 Community** - Safety reviews and tips
- **⚙️ Settings** - Personalization options

### 🧪 Testing Tools
- **GPS Diagnostic** - Location accuracy testing
- **Address Debugging** - Geocoding verification
- **Phone Access** - Mobile compatibility testing
- **HTTPS Status** - Security verification

## 🔧 Setup Instructions

### 1. Basic Setup
```bash
# Clone or download the project
# No installation required - pure web technologies!
```

### 2. Firebase Setup (Optional)
```bash
# Follow the firebase-setup-guide.md for:
# - Authentication setup
# - Firestore database configuration
# - Real-time features activation
```

### 3. HTTPS Development
```bash
# The project includes an HTTPS server for:
# - Geolocation API access
# - PWA features
# - Secure testing environment
python https_server.py
```

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full Support |
| Firefox | ✅ Full Support |
| Safari | ✅ Full Support |
| Edge | ✅ Full Support |
| Mobile | ✅ Responsive Design |

## 📱 Mobile Features

- **📍 GPS Integration** - Native geolocation access
- **📳 Push Notifications** - Real-time safety alerts
- **📱 PWA Support** - Install as mobile app
- **🔄 Offline Mode** - Basic functionality without internet
- **👆 Touch Optimized** - Mobile-first interface design

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **🐛 Report Bugs** - Use the issue tracker
2. **💡 Suggest Features** - Share your ideas
3. **🔧 Submit PRs** - Improve the codebase
4. **📖 Documentation** - Help others understand
5. **🧪 Testing** - Try on different devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **📧 Email**: support@rakshita.app
- **💬 Community**: Join our safety network
- **📖 Docs**: Check the documentation folder
- **🐛 Issues**: GitHub issue tracker

## 🎯 Roadmap

- [ ] **🌍 Multi-language Support**
- [ ] **🔗 API Integration** - Third-party safety services
- [ ] **📊 Advanced Analytics** - Detailed safety insights
- [ ] **🤖 Enhanced AI** - Better threat prediction
- [ ] **🌐 Global Expansion** - Worldwide safety data

---

**Made with ❤️ for safer travels worldwide**

*Rakshita - Because every journey should be a safe one* 🛡️