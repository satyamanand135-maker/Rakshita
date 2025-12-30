# Rakshita Project Structure

## 📁 Organized Folder Structure

The Rakshita project has been organized into a clean, maintainable folder structure for better development and deployment.

```
📁 Rakshita/
├── 📄 index.html                    # Main landing page
├── 📄 .gitignore                    # Git ignore rules
├── 📄 PROJECT_STRUCTURE.md          # This documentation file
│
├── 📁 assets/                       # Static assets
│   ├── 📁 css/                      # Stylesheets
│   │   ├── 📄 perfect-dark-theme.css      # Main dark theme
│   │   ├── 📄 theme-config.css            # Theme configuration
│   │   ├── 📄 dashboard-enhancements.css  # Enhanced animations
│   │   └── 📄 styles.css                  # Base styles
│   │
│   ├── 📁 js/                       # JavaScript files
│   │   ├── 📄 script.js                   # Main application script
│   │   ├── 📄 community.js               # Community features
│   │   ├── 📄 data-manager.js             # Data management
│   │   ├── 📄 firebase-config.js          # Firebase configuration
│   │   ├── 📄 firebase-data-manager.js    # Firebase data handling
│   │   ├── 📄 enhanced-location-manager.js # Location services
│   │   ├── 📄 fix-routes.js               # Route fixing utilities
│   │   ├── 📄 google-maps-config.js       # Google Maps setup
│   │   └── 📄 openstreetmap-config.js     # OpenStreetMap setup
│   │
│   └── 📁 images/                   # Images and media files
│       └── (empty - ready for future assets)
│
├── 📁 pages/                        # HTML pages (except main index)
│   ├── 📁 admin/                    # Admin-related pages
│   │   ├── 📄 admin-auth.html             # Admin authentication
│   │   ├── 📄 admin-dashboard.html        # Admin dashboard
│   │   └── 📄 admin-dashboard-guide.html  # Admin guide
│   │
│   ├── 📁 guides/                   # User guides and tutorials
│   │   ├── 📄 ai-threat-detection-guide.html    # AI threat detection
│   │   ├── 📄 authorities-dashboard-guide.html  # Authorities guide
│   │   ├── 📄 community-safety-guide.html       # Community safety
│   │   ├── 📄 emergency-sos-guide.html          # Emergency SOS
│   │   ├── 📄 geofencing-guide.html             # Geo-fencing
│   │   ├── 📄 location-tracking-guide.html      # Location tracking
│   │   └── 📄 safe-route-planning-guide.html    # Route planning
│   │
│   └── 📁 demos/                    # Interactive demos
│       ├── 📄 emergency-sos-demo.html           # SOS demo
│       ├── 📄 enhanced-safe-routes-demo.html    # Routes demo
│       └── 📄 test-safe-routes.html             # Route testing
│
├── 📁 docs/                         # Documentation files
│   ├── 📄 README.md                      # Project README
│   ├── 📄 DARK_THEME_GUIDE.md            # Dark theme documentation
│   ├── 📄 DEPLOYMENT.md                  # Deployment instructions
│   ├── 📄 firebase-setup-guide.md        # Firebase setup
│   ├── 📄 firebase-quick-start.md        # Firebase quick start
│   ├── 📄 firestore-edition-guide.md     # Firestore guide
│   ├── 📄 google-maps-setup-guide.md     # Google Maps setup
│   └── 📄 openstreetmap-setup-guide.md   # OpenStreetMap setup
│
├── 📁 config/                       # Configuration files
│   └── (empty - ready for config files)
│
└── 📁 server/                       # Server-related files
    ├── 📄 https_server.py               # HTTPS server script
    ├── 📄 server.crt                    # SSL certificate
    └── 📄 server.key                    # SSL private key
```

## 🎯 Benefits of This Structure

### **1. Better Organization**
- **Separation of Concerns**: CSS, JS, HTML, and docs are in separate folders
- **Logical Grouping**: Related files are grouped together (admin, guides, demos)
- **Scalability**: Easy to add new files in appropriate categories

### **2. Improved Maintainability**
- **Clear File Locations**: Developers know exactly where to find specific files
- **Consistent Paths**: All asset paths follow the same pattern
- **Version Control**: Better Git history with organized file changes

### **3. Enhanced Development Experience**
- **IDE Support**: Better autocomplete and navigation in modern IDEs
- **Build Tools**: Easier integration with build tools and bundlers
- **Deployment**: Cleaner deployment with organized assets

## 🔗 Path References

### **From Root (index.html)**
```html
<!-- CSS Files -->
<link rel="stylesheet" href="assets/css/perfect-dark-theme.css">
<link rel="stylesheet" href="assets/css/theme-config.css">

<!-- JS Files -->
<script src="assets/js/script.js"></script>

<!-- Page Links -->
<a href="pages/admin/admin-auth.html">Admin Login</a>
<a href="pages/guides/emergency-sos-guide.html">SOS Guide</a>
```

### **From Pages (2 levels deep)**
```html
<!-- CSS Files -->
<link rel="stylesheet" href="../../assets/css/perfect-dark-theme.css">

<!-- JS Files -->
<script src="../../assets/js/script.js"></script>

<!-- Navigation -->
<a href="../../index.html">Home</a>
<a href="../admin/admin-dashboard.html">Admin Dashboard</a>
```

