// 🗺️ OpenStreetMap Location Manager for Rakshita
// Free, open-source mapping solution using Leaflet and OpenStreetMap

class OpenStreetMapLocationManager {
    constructor() {
        this.map = null;
        this.userMarker = null;
        this.routeLayer = null;
        this.markersLayer = null;
        this.watchId = null;
        this.currentPosition = null;
        this.isTracking = false;
        this.isInitialized = false;
        
        // 📍 Location callbacks
        this.locationCallbacks = [];
        this.errorCallbacks = [];
        
        console.log('🗺️ OpenStreetMap Location Manager initialized');
    }
    
    // 🚀 Initialize OpenStreetMap
    async initializeOpenStreetMap() {
        try {
            // Load Leaflet library
            await loadLeafletLibrary();
            
            // Initialize layers
            this.initializeLayers();
            
            this.isInitialized = true;
            console.log('✅ OpenStreetMap initialized successfully');
            return true;
            
        } catch (error) {
            console.error('❌ Failed to initialize OpenStreetMap:', error);
            this.notifyError(error.message);
            return false;
        }
    }
    
    // 🛠️ Initialize map layers
    initializeLayers() {
        this.markersLayer = L.layerGroup();
        console.log('🛠️ OpenStreetMap layers initialized');
    }
    
    // 🗺️ Create map instance
    createMap(containerId, options = {}) {
        if (!this.isInitialized) {
            throw new Error('OpenStreetMap not initialized. Call initializeOpenStreetMap() first.');
        }
        
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Map container '${containerId}' not found`);
        }
        
        const mapOptions = {
            center: OPENSTREETMAP_CONFIG.defaultCenter,
            zoom: OPENSTREETMAP_CONFIG.defaultZoom,
            minZoom: OPENSTREETMAP_CONFIG.minZoom,
            maxZoom: OPENSTREETMAP_CONFIG.maxZoom,
            ...OPENSTREETMAP_CONFIG.mapOptions,
            ...options
        };
        
        // Create map
        this.map = L.map(containerId, mapOptions);
        
        // Add tile layer
        const tileLayer = getTileLayer('cartodb'); // Using clean CartoDB style
        tileLayer.addTo(this.map);
        
        // Add markers layer
        this.markersLayer.addTo(this.map);
        
        // Add mobile-specific settings
        if (isMobileDevice()) {
            this.map.options.tap = true;
            this.map.options.tapTolerance = 15;
        }
        
        console.log('🗺️ Map created successfully');
        return this.map;
    }
    
    // 📍 Get current location
    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            
            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            };
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        timestamp: position.timestamp
                    };
                    
                    this.currentPosition = location;
                    this.notifyLocationUpdate(location);
                    resolve(location);
                },
                (error) => {
                    console.error('❌ Geolocation error:', error);
                    this.notifyError(error.message);
                    reject(error);
                },
                options
            );
        });
    }
    
    // 🔄 Start continuous location tracking
    startLocationTracking() {
        if (this.isTracking) {
            console.log('📍 Location tracking already active');
            return;
        }
        
        if (!navigator.geolocation) {
            throw new Error('Geolocation not supported');
        }
        
        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 30000
        };
        
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp,
                    speed: position.coords.speed,
                    heading: position.coords.heading
                };
                
                this.currentPosition = location;
                this.updateUserMarker(location);
                this.notifyLocationUpdate(location);
            },
            (error) => {
                console.error('❌ Location tracking error:', error);
                this.notifyError(error.message);
            },
            options
        );
        
        this.isTracking = true;
        console.log('🔄 Location tracking started');
    }
    
    // ⏹️ Stop location tracking
    stopLocationTracking() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
        
        this.isTracking = false;
        console.log('⏹️ Location tracking stopped');
    }
    
    // 📍 Update user marker on map
    updateUserMarker(location) {
        if (!this.map) return;
        
        const latlng = [location.lat, location.lng];
        
        if (this.userMarker) {
            this.userMarker.setLatLng(latlng);
        } else {
            this.userMarker = createCustomMarker(latlng, {
                ...OPENSTREETMAP_CONFIG.markers.user,
                title: 'Your Location'
            });
            
            this.userMarker.bindPopup(`
                <div style="text-align: center;">
                    <strong>📍 Your Location</strong><br>
                    <small>Accuracy: ${location.accuracy}m</small>
                </div>
            `);
            
            this.userMarker.addTo(this.markersLayer);
        }
        
        // Center map on user location
        this.map.setView(latlng, this.map.getZoom());
    }
    
    // 🔍 Geocode address to coordinates using Nominatim
    async geocodeAddress(address) {
        const params = new URLSearchParams({
            q: address,
            ...OPENSTREETMAP_CONFIG.geocoding.searchParams
        });
        
        const url = `${OPENSTREETMAP_CONFIG.geocoding.nominatimUrl}?${params}`;
        
        try {
            const response = await fetch(url);
            const results = await response.json();
            
            if (results && results.length > 0) {
                const result = results[0];
                return {
                    lat: parseFloat(result.lat),
                    lng: parseFloat(result.lon),
                    address: result.display_name,
                    placeId: result.place_id,
                    boundingBox: result.boundingbox
                };
            } else {
                throw new Error('Address not found');
            }
        } catch (error) {
            throw new Error(`Geocoding failed: ${error.message}`);
        }
    }
    
    // 📍 Reverse geocode coordinates to address using Nominatim
    async reverseGeocode(lat, lng) {
        const params = new URLSearchParams({
            lat: lat,
            lon: lng,
            ...OPENSTREETMAP_CONFIG.geocoding.reverseParams
        });
        
        const url = `${OPENSTREETMAP_CONFIG.geocoding.reverseUrl}?${params}`;
        
        try {
            const response = await fetch(url);
            const result = await response.json();
            
            if (result && result.display_name) {
                return {
                    address: result.display_name,
                    components: result.address,
                    placeId: result.place_id
                };
            } else {
                throw new Error('Address not found');
            }
        } catch (error) {
            throw new Error(`Reverse geocoding failed: ${error.message}`);
        }
    }
    
    // 🛣️ Calculate route using OSRM
    async calculateRoute(origin, destination, options = {}) {
        const profile = options.travelMode?.toLowerCase() || 'driving';
        const osrmProfile = OPENSTREETMAP_CONFIG.routing.profiles[profile] || 'driving';
        
        const coords = `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;
        const params = new URLSearchParams(OPENSTREETMAP_CONFIG.routing.routeParams);
        
        const url = `${OPENSTREETMAP_CONFIG.routing.osrmUrl}/${osrmProfile}/${coords}?${params}`;
        
        try {
            const response = await fetch(url);
            const result = await response.json();
            
            if (result.code === 'Ok' && result.routes && result.routes.length > 0) {
                const route = result.routes[0];
                
                return {
                    distance: {
                        text: `${(route.distance / 1000).toFixed(1)} km`,
                        value: route.distance
                    },
                    duration: {
                        text: `${Math.round(route.duration / 60)} min`,
                        value: route.duration
                    },
                    geometry: route.geometry,
                    steps: route.legs[0]?.steps || [],
                    coordinates: route.geometry.coordinates
                };
            } else {
                throw new Error(result.message || 'Route not found');
            }
        } catch (error) {
            throw new Error(`Route calculation failed: ${error.message}`);
        }
    }
    
    // 🗺️ Display route on map
    async displayRoute(origin, destination, options = {}) {
        try {
            // Calculate route
            const route = await this.calculateRoute(origin, destination, options);
            
            // Clear existing route
            if (this.routeLayer) {
                this.map.removeLayer(this.routeLayer);
            }
            
            // Convert coordinates to Leaflet format [lat, lng]
            const latlngs = route.coordinates.map(coord => [coord[1], coord[0]]);
            
            // Create route polyline
            this.routeLayer = L.polyline(latlngs, {
                color: '#3B82F6',
                weight: 5,
                opacity: 0.8,
                smoothFactor: 1
            });
            
            // Add route to map
            this.routeLayer.addTo(this.map);
            
            // Add markers for origin and destination
            const originMarker = createCustomMarker([origin.lat, origin.lng], {
                ...OPENSTREETMAP_CONFIG.markers.user,
                title: 'Start'
            });
            
            const destMarker = createCustomMarker([destination.lat, destination.lng], {
                ...OPENSTREETMAP_CONFIG.markers.destination,
                title: 'Destination'
            });
            
            originMarker.bindPopup('<strong>🚀 Start</strong>');
            destMarker.bindPopup('<strong>🏁 Destination</strong>');
            
            originMarker.addTo(this.markersLayer);
            destMarker.addTo(this.markersLayer);
            
            // Fit map to route bounds
            this.map.fitBounds(this.routeLayer.getBounds(), { padding: [20, 20] });
            
            return route;
            
        } catch (error) {
            console.error('❌ Failed to display route:', error);
            throw error;
        }
    }
    
    // 🔍 Search places using Overpass API
    async searchPlaces(query, location = null) {
        const searchLocation = location || this.currentPosition;
        if (!searchLocation) {
            throw new Error('Location required for places search');
        }
        
        // Get place type from query
        let placeType = OPENSTREETMAP_CONFIG.places.placeTypes.attractions; // default
        
        for (const [key, value] of Object.entries(OPENSTREETMAP_CONFIG.places.placeTypes)) {
            if (query.toLowerCase().includes(key.slice(0, -1))) { // remove 's' from end
                placeType = value;
                break;
            }
        }
        
        // Create Overpass query
        const radius = OPENSTREETMAP_CONFIG.places.searchRadius;
        const overpassQuery = `
            [out:json][timeout:25];
            (
                node["${placeType}"](around:${radius},${searchLocation.lat},${searchLocation.lng});
                way["${placeType}"](around:${radius},${searchLocation.lat},${searchLocation.lng});
                relation["${placeType}"](around:${radius},${searchLocation.lat},${searchLocation.lng});
            );
            out center meta;
        `;
        
        try {
            const response = await fetch(OPENSTREETMAP_CONFIG.places.overpassUrl, {
                method: 'POST',
                body: overpassQuery
            });
            
            const result = await response.json();
            
            if (result.elements) {
                return result.elements.slice(0, 10).map(element => {
                    const lat = element.lat || element.center?.lat;
                    const lng = element.lon || element.center?.lon;
                    
                    return {
                        name: element.tags?.name || 'Unnamed Place',
                        address: this.formatAddress(element.tags),
                        location: { lat, lng },
                        placeId: element.id,
                        types: [element.tags?.amenity || element.tags?.tourism || 'place'],
                        tags: element.tags
                    };
                }).filter(place => place.location.lat && place.location.lng);
            }
            
            return [];
            
        } catch (error) {
            throw new Error(`Places search failed: ${error.message}`);
        }
    }
    
    // 🏠 Format address from OSM tags
    formatAddress(tags) {
        if (!tags) return 'Address not available';
        
        const parts = [];
        if (tags['addr:housenumber']) parts.push(tags['addr:housenumber']);
        if (tags['addr:street']) parts.push(tags['addr:street']);
        if (tags['addr:city']) parts.push(tags['addr:city']);
        if (tags['addr:postcode']) parts.push(tags['addr:postcode']);
        
        return parts.length > 0 ? parts.join(', ') : 'Address not available';
    }
    
    // 🎯 Add safety zone to map
    addSafetyZone(latlng, radius, safetyLevel = 'safe', title = '') {
        const zone = createSafetyZone(latlng, radius, safetyLevel);
        
        if (title) {
            zone.bindPopup(`<strong>${title}</strong><br>Safety Level: ${safetyLevel}`);
        }
        
        zone.addTo(this.markersLayer);
        return zone;
    }
    
    // 🧹 Clear all markers and routes
    clearMap() {
        if (this.markersLayer) {
            this.markersLayer.clearLayers();
        }
        
        if (this.routeLayer) {
            this.map.removeLayer(this.routeLayer);
            this.routeLayer = null;
        }
        
        this.userMarker = null;
    }
    
    // 📞 Event listeners
    onLocationUpdate(callback) {
        this.locationCallbacks.push(callback);
    }
    
    onError(callback) {
        this.errorCallbacks.push(callback);
    }
    
    // 📢 Notify callbacks
    notifyLocationUpdate(location) {
        this.locationCallbacks.forEach(callback => {
            try {
                callback(location);
            } catch (error) {
                console.error('❌ Location callback error:', error);
            }
        });
    }
    
    notifyError(error) {
        this.errorCallbacks.forEach(callback => {
            try {
                callback(error);
            } catch (err) {
                console.error('❌ Error callback error:', err);
            }
        });
    }
    
    // 🧹 Cleanup
    destroy() {
        this.stopLocationTracking();
        this.locationCallbacks = [];
        this.errorCallbacks = [];
        
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
        
        console.log('🧹 OpenStreetMap Location Manager destroyed');
    }
}

// 🌍 Global instance
window.openStreetMapLocationManager = new OpenStreetMapLocationManager();

// 🚀 Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🗺️ Initializing OpenStreetMap Location Manager...');
    
    try {
        const success = await window.openStreetMapLocationManager.initializeOpenStreetMap();
        if (success) {
            console.log('✅ OpenStreetMap Location Manager ready');
        }
    } catch (error) {
        console.error('❌ Failed to initialize OpenStreetMap:', error);
    }
});

console.log('🗺️ OpenStreetMap Location Manager loaded');