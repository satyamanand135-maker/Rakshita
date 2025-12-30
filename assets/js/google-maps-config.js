// 🗺️ Google Maps Configuration for Rakshita
// Replace 'YOUR_API_KEY_HERE' with your actual Google Maps API key

const GOOGLE_MAPS_CONFIG = {
    // 🔑 PUT YOUR GOOGLE MAPS API KEY HERE
    apiKey: 'YOUR_API_KEY_HERE', // ← Replace this with your actual API key
    
    // 📍 Default map settings
    defaultCenter: { lat: 28.6139, lng: 77.2090 }, // New Delhi, India
    defaultZoom: 12,
    
    // 🎨 Map styling options
    mapOptions: {
        zoom: 12,
        center: { lat: 28.6139, lng: 77.2090 },
        mapTypeId: 'roadmap',
        styles: [
            {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "transit",
                "elementType": "labels",
                "stylers": [{ "visibility": "off" }]
            }
        ],
        // 🛡️ Safety-focused options
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true
    },
    
    // 🔍 Places API settings
    placesOptions: {
        types: ['establishment', 'geocode'],
        componentRestrictions: { country: 'in' }, // Restrict to India (change as needed)
        fields: ['place_id', 'geometry', 'name', 'formatted_address', 'types']
    },
    
    // 🛣️ Directions API settings
    directionsOptions: {
        travelMode: 'DRIVING', // DRIVING, WALKING, BICYCLING, TRANSIT
        unitSystem: 'METRIC',
        avoidHighways: false,
        avoidTolls: false,
        optimizeWaypoints: true
    },
    
    // 📍 Geocoding settings
    geocodingOptions: {
        region: 'IN', // India region code
        language: 'en'
    }
};

// 🚨 API Key Validation
function validateGoogleMapsApiKey() {
    if (GOOGLE_MAPS_CONFIG.apiKey === 'YOUR_API_KEY_HERE' || !GOOGLE_MAPS_CONFIG.apiKey) {
        console.error('🚨 Google Maps API Key not configured!');
        console.log('📝 To fix this:');
        console.log('1. Go to https://console.cloud.google.com/');
        console.log('2. Create a new project or select existing');
        console.log('3. Enable Google Maps JavaScript API');
        console.log('4. Enable Places API');
        console.log('5. Enable Directions API');
        console.log('6. Enable Geocoding API');
        console.log('7. Create API key with restrictions');
        console.log('8. Replace YOUR_API_KEY_HERE in google-maps-config.js');
        return false;
    }
    return true;
}

// 🔗 Generate Google Maps API URL
function getGoogleMapsApiUrl() {
    if (!validateGoogleMapsApiKey()) {
        return null;
    }
    
    const libraries = ['places', 'geometry', 'drawing'];
    return `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=${libraries.join(',')}&callback=initGoogleMaps`;
}

// 📱 Export configuration
window.GOOGLE_MAPS_CONFIG = GOOGLE_MAPS_CONFIG;
window.validateGoogleMapsApiKey = validateGoogleMapsApiKey;
window.getGoogleMapsApiUrl = getGoogleMapsApiUrl;

console.log('🗺️ Google Maps Configuration Loaded');
console.log('🔑 API Key Status:', GOOGLE_MAPS_CONFIG.apiKey !== 'YOUR_API_KEY_HERE' ? 'Configured' : 'Not Configured');