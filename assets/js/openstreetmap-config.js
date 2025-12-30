// 🗺️ OpenStreetMap Configuration for Rakshita
// Free, open-source mapping solution - No API key required!

const OPENSTREETMAP_CONFIG = {
    // 🌍 Map tile providers (all free!)
    tileProviders: {
        // Default OpenStreetMap tiles
        osm: {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        },
        
        // CartoDB Positron (clean, minimal style)
        cartodb: {
            url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 19
        },
        
        // Satellite imagery (Esri)
        satellite: {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: 18
        }
    },
    
    // 📍 Default map settings
    defaultCenter: [28.6139, 77.2090], // New Delhi, India [lat, lng]
    defaultZoom: 12,
    minZoom: 3,
    maxZoom: 19,
    
    // 🎨 Map styling options
    mapOptions: {
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        dragging: true,
        touchZoom: true,
        boxZoom: true,
        keyboard: true,
        zoomAnimation: true,
        fadeAnimation: true,
        markerZoomAnimation: true
    },
    
    // 🔍 Geocoding settings (using Nominatim - free!)
    geocoding: {
        // Nominatim API (OpenStreetMap's geocoding service)
        nominatimUrl: 'https://nominatim.openstreetmap.org/search',
        reverseUrl: 'https://nominatim.openstreetmap.org/reverse',
        
        // Search parameters
        searchParams: {
            format: 'json',
            addressdetails: 1,
            limit: 5,
            countrycodes: 'in', // Restrict to India (change as needed)
            'accept-language': 'en'
        },
        
        // Reverse geocoding parameters
        reverseParams: {
            format: 'json',
            addressdetails: 1,
            'accept-language': 'en'
        }
    },
    
    // 🛣️ Routing settings (using OSRM - free!)
    routing: {
        // Open Source Routing Machine
        osrmUrl: 'https://router.project-osrm.org/route/v1',
        
        // Routing profiles
        profiles: {
            driving: 'driving',
            walking: 'foot',
            cycling: 'bicycle'
        },
        
        // Route parameters
        routeParams: {
            overview: 'full',
            geometries: 'geojson',
            steps: true,
            annotations: true
        }
    },
    
    // 🏢 Places search (using Overpass API - free!)
    places: {
        overpassUrl: 'https://overpass-api.de/api/interpreter',
        
        // Common place types
        placeTypes: {
            restaurants: 'amenity=restaurant',
            hospitals: 'amenity=hospital',
            police: 'amenity=police',
            schools: 'amenity=school',
            banks: 'amenity=bank',
            hotels: 'tourism=hotel',
            attractions: 'tourism=attraction',
            shops: 'shop',
            transport: 'public_transport'
        },
        
        // Search radius (in meters)
        searchRadius: 5000
    },
    
    // 🎯 Marker styles
    markers: {
        user: {
            color: '#3B82F6',
            fillColor: '#3B82F6',
            fillOpacity: 0.8,
            radius: 8,
            weight: 2
        },
        
        destination: {
            color: '#EF4444',
            fillColor: '#EF4444',
            fillOpacity: 0.8,
            radius: 8,
            weight: 2
        },
        
        waypoint: {
            color: '#F59E0B',
            fillColor: '#F59E0B',
            fillOpacity: 0.8,
            radius: 6,
            weight: 2
        },
        
        danger: {
            color: '#DC2626',
            fillColor: '#FEE2E2',
            fillOpacity: 0.3,
            radius: 50,
            weight: 2
        },
        
        safe: {
            color: '#16A34A',
            fillColor: '#DCFCE7',
            fillOpacity: 0.3,
            radius: 50,
            weight: 2
        }
    },
    
    // 🛡️ Safety zone colors
    safetyZones: {
        safe: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        unknown: '#6B7280'
    }
};

// 🌐 CDN URLs for Leaflet library
const LEAFLET_CDN = {
    css: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    js: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
};

// 🔗 Load Leaflet library
function loadLeafletLibrary() {
    return new Promise((resolve, reject) => {
        // Check if already loaded
        if (window.L) {
            resolve();
            return;
        }
        
        // Load CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = LEAFLET_CDN.css;
        document.head.appendChild(cssLink);
        
        // Load JavaScript
        const script = document.createElement('script');
        script.src = LEAFLET_CDN.js;
        script.onload = () => {
            console.log('🗺️ Leaflet library loaded successfully');
            resolve();
        };
        script.onerror = () => {
            reject(new Error('Failed to load Leaflet library'));
        };
        document.head.appendChild(script);
    });
}

// 🌍 Get tile layer
function getTileLayer(provider = 'osm') {
    const config = OPENSTREETMAP_CONFIG.tileProviders[provider] || OPENSTREETMAP_CONFIG.tileProviders.osm;
    return L.tileLayer(config.url, {
        attribution: config.attribution,
        maxZoom: config.maxZoom
    });
}

// 📍 Create custom marker
function createCustomMarker(latlng, options = {}) {
    const markerOptions = {
        ...OPENSTREETMAP_CONFIG.markers.user,
        ...options
    };
    
    return L.circleMarker(latlng, markerOptions);
}

// 🎨 Create safety zone
function createSafetyZone(latlng, radius, safetyLevel = 'safe') {
    const color = OPENSTREETMAP_CONFIG.safetyZones[safetyLevel];
    
    return L.circle(latlng, {
        radius: radius,
        color: color,
        fillColor: color,
        fillOpacity: 0.2,
        weight: 2
    });
}

// 📱 Check if mobile device
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 🌐 Export configuration
window.OPENSTREETMAP_CONFIG = OPENSTREETMAP_CONFIG;
window.LEAFLET_CDN = LEAFLET_CDN;
window.loadLeafletLibrary = loadLeafletLibrary;
window.getTileLayer = getTileLayer;
window.createCustomMarker = createCustomMarker;
window.createSafetyZone = createSafetyZone;
window.isMobileDevice = isMobileDevice;

console.log('🗺️ OpenStreetMap Configuration Loaded');
console.log('✅ No API key required - completely free!');
console.log('🌍 Using OpenStreetMap, Nominatim, and OSRM services');