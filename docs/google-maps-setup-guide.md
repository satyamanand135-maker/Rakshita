# 🗺️ Google Maps API Setup Guide for Rakshita

This guide will help you set up Google Maps API for location tracking and routing in your Rakshita application.

## 🚀 Quick Setup Steps

### **Step 1: Get Google Maps API Key**

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create or Select Project**
   - Click "Select a project" → "New Project"
   - Name: "Rakshita Safety App"
   - Click "Create"

3. **Enable Required APIs**
   Navigate to "APIs & Services" → "Library" and enable:
   - ✅ **Maps JavaScript API**
   - ✅ **Places API**
   - ✅ **Directions API**
   - ✅ **Geocoding API**
   - ✅ **Geolocation API**

4. **Create API Key**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your API key (looks like: `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### **Step 2: Configure API Key in Rakshita**

1. **Open the configuration file**
   ```
   📁 Your Project Folder
   └── google-maps-config.js
   ```

2. **Replace the API key**
   ```javascript
   // 🔑 PUT YOUR GOOGLE MAPS API KEY HERE
   apiKey: 'YOUR_API_KEY_HERE', // ← Replace this line
   ```
   
   **Change to:**
   ```javascript
   // 🔑 PUT YOUR GOOGLE MAPS API KEY HERE
   apiKey: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // ← Your actual API key
   ```

### **Step 3: Secure Your API Key (Recommended)**

1. **Set API Restrictions**
   - In Google Cloud Console → "Credentials"
   - Click on your API key
   - Under "API restrictions" → "Restrict key"
   - Select the APIs you enabled above

2. **Set Application Restrictions**
   - Choose "HTTP referrers (web sites)"
   - Add your domains:
     ```
     https://localhost:8443/*
     https://yourdomain.com/*
     ```

### **Step 4: Test the Integration**

1. **Start your HTTPS server**
   ```bash
   python https_server.py
   ```

2. **Open the test page**
   ```
   https://localhost:8443/test-safe-routes.html
   ```

3. **Check for success messages**
   - Look for "Google Maps initialized successfully" in console
   - Test location detection
   - Test route planning

## 🔧 Configuration Options

### **Default Settings** (in `google-maps-config.js`)

```javascript
const GOOGLE_MAPS_CONFIG = {
    // 🔑 Your API key goes here
    apiKey: 'YOUR_API_KEY_HERE',
    
    // 📍 Default map center (New Delhi, India)
    defaultCenter: { lat: 28.6139, lng: 77.2090 },
    
    // 🎨 Map styling and options
    mapOptions: {
        zoom: 12,
        mapTypeId: 'roadmap',
        // ... other options
    },
    
    // 🔍 Places search settings
    placesOptions: {
        types: ['establishment', 'geocode'],
        componentRestrictions: { country: 'in' }, // India
        // ... other options
    }
};
```

### **Customization Options**

1. **Change Default Location**
   ```javascript
   defaultCenter: { lat: YOUR_LAT, lng: YOUR_LNG }
   ```

2. **Change Country Restriction**
   ```javascript
   componentRestrictions: { country: 'us' } // For USA
   componentRestrictions: { country: 'uk' } // For UK
   ```

3. **Modify Map Style**
   ```javascript
   mapOptions: {
       styles: [
           // Add custom map styling here
       ]
   }
   ```

## 🚨 Troubleshooting

### **Common Issues & Solutions**

#### **❌ "Google Maps API key not configured"**
- **Solution**: Replace `YOUR_API_KEY_HERE` with your actual API key in `google-maps-config.js`

#### **❌ "This API project is not authorized to use this API"**
- **Solution**: Enable the required APIs in Google Cloud Console
- Check: Maps JavaScript API, Places API, Directions API, Geocoding API

#### **❌ "RefererNotAllowedMapError"**
- **Solution**: Add your domain to API key restrictions
- Add: `https://localhost:8443/*` for local development

#### **❌ "Location access denied"**
- **Solution**: Ensure you're using HTTPS (required for geolocation)
- Use: `https://localhost:8443` not `http://localhost:8443`

#### **❌ "Failed to load Google Maps API"**
- **Solution**: Check internet connection and API key validity
- Verify: API key is correct and not expired

### **Debug Steps**

1. **Check Console Logs**
   - Open browser console (F12)
   - Look for Google Maps related errors
   - Check for API key validation messages

2. **Verify API Key**
   - Test key at: https://developers.google.com/maps/documentation/javascript/get-api-key
   - Ensure all required APIs are enabled

3. **Test Network**
   - Check if `https://maps.googleapis.com` is accessible
   - Verify no firewall blocking Google services

## 💰 Pricing Information

### **Google Maps API Pricing**

- **Free Tier**: $200 credit per month (covers ~28,000 map loads)
- **Maps JavaScript API**: $7 per 1,000 loads
- **Places API**: $17 per 1,000 requests
- **Directions API**: $5 per 1,000 requests
- **Geocoding API**: $5 per 1,000 requests

### **Cost Optimization Tips**

1. **Set Usage Limits**
   - Go to Google Cloud Console → "APIs & Services" → "Quotas"
   - Set daily limits to prevent unexpected charges

2. **Use Caching**
   - Cache geocoding results
   - Store frequently used routes
   - Implement client-side caching

3. **Optimize Requests**
   - Batch multiple requests when possible
   - Use appropriate zoom levels
   - Minimize unnecessary API calls

## 🔐 Security Best Practices

### **API Key Security**

1. **Never expose API keys in public repositories**
2. **Use environment variables for production**
3. **Set proper API restrictions**
4. **Monitor usage regularly**
5. **Rotate keys periodically**

### **Production Setup**

```javascript
// For production, use environment variables
const GOOGLE_MAPS_CONFIG = {
    apiKey: process.env.GOOGLE_MAPS_API_KEY || 'fallback-key',
    // ... other config
};
```

## 📱 Mobile Considerations

### **Mobile-Specific Settings**

```javascript
// Enhanced mobile support
mapOptions: {
    gestureHandling: 'cooperative', // Better mobile scrolling
    zoomControl: true,
    mapTypeControl: false, // Save space on mobile
    streetViewControl: false,
    fullscreenControl: true
}
```

### **Performance Optimization**

1. **Lazy Loading**: Load maps only when needed
2. **Reduced Complexity**: Use simpler map styles on mobile
3. **Caching**: Store location data locally
4. **Compression**: Minimize API responses

## 🎯 Next Steps

After successful setup:

1. **✅ Test all features** in the dashboard
2. **🔧 Customize** map styling and behavior
3. **📱 Test** on mobile devices
4. **🚀 Deploy** to production with proper security
5. **📊 Monitor** API usage and costs

## 📞 Support

- **Google Maps Documentation**: https://developers.google.com/maps/documentation
- **API Key Help**: https://developers.google.com/maps/documentation/javascript/get-api-key
- **Pricing Calculator**: https://mapsplatform.google.com/pricing/
- **Community Support**: https://stackoverflow.com/questions/tagged/google-maps

---

**🎉 Congratulations!** Your Rakshita app now uses Google Maps for accurate location tracking and intelligent route planning!