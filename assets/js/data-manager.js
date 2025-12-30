// Rakshita Data Management System
class RakshitaDataManager {
    constructor() {
        this.storageKey = 'rakshita_data';
        this.apiEndpoint = 'https://api.rakshita.com'; // Replace with your actual API
        this.isOnline = navigator.onLine;
        this.syncQueue = [];
        
        // Initialize data structure
        this.initializeData();
        
        // Setup online/offline listeners
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
    }

    // Initialize default data structure
    initializeData() {
        const defaultData = {
            user: null,
            settings: {
                locationSharing: true,
                emergencyAlerts: true,
                communityUpdates: true,
                safetyZoneAlerts: true,
                trackingEnabled: true
            },
            locationHistory: [],
            safetyZones: [],
            emergencyContacts: [],
            communityUpdates: [],
            routes: [],
            activityLog: [],
            lastSync: null
        };

        // Load existing data or use defaults
        const existingData = this.getLocalData();
        if (!existingData) {
            this.saveLocalData(defaultData);
        }
    }

    // Local Storage Operations
    getLocalData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error reading local data:', error);
            return null;
        }
    }

    saveLocalData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving local data:', error);
            return false;
        }
    }

    updateLocalData(updates) {
        const currentData = this.getLocalData();
        const updatedData = { ...currentData, ...updates };
        return this.saveLocalData(updatedData);
    }

    // User Management
    async registerUser(userData) {
        const user = {
            id: this.generateId(),
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            emergencyContact: userData.emergencyContact,
            createdAt: new Date().toISOString(),
            isActive: true
        };

        // Save locally first
        this.updateLocalData({ user });

        // Add emergency contact
        this.addEmergencyContact({
            name: 'Emergency Contact',
            phone: userData.emergencyContact,
            isPrimary: true
        });

        // Sync with server if online
        if (this.isOnline) {
            try {
                await this.syncUserToServer(user);
            } catch (error) {
                console.log('Will sync when online');
                this.addToSyncQueue('user', user);
            }
        } else {
            this.addToSyncQueue('user', user);
        }

        return user;
    }

    async loginUser(email, password) {
        // In a real app, this would authenticate with the server
        // For demo, we'll check if user exists locally or create a demo user
        
        let userData = this.getLocalData();
        
        if (!userData.user) {
            // Create demo user for login
            const demoUser = {
                id: this.generateId(),
                name: 'John Doe',
                email: email,
                phone: '+91-9876543210',
                emergencyContact: '+91-9123456789',
                createdAt: new Date().toISOString(),
                isActive: true
            };
            
            this.updateLocalData({ user: demoUser });
            return demoUser;
        }
        
        return userData.user;
    }

    logoutUser() {
        const data = this.getLocalData();
        data.user = null;
        this.saveLocalData(data);
    }

    getCurrentUser() {
        const data = this.getLocalData();
        return data ? data.user : null;
    }

    // Location Management
    saveLocation(locationData) {
        const location = {
            id: this.generateId(),
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            accuracy: locationData.accuracy,
            timestamp: new Date().toISOString(),
            address: locationData.address || null,
            safetyStatus: this.calculateSafetyStatus(locationData)
        };

        const data = this.getLocalData();
        data.locationHistory = data.locationHistory || [];
        data.locationHistory.push(location);

        // Keep only last 1000 locations to manage storage
        if (data.locationHistory.length > 1000) {
            data.locationHistory = data.locationHistory.slice(-1000);
        }

        this.saveLocalData(data);

        // Sync with server
        if (this.isOnline) {
            this.syncLocationToServer(location);
        } else {
            this.addToSyncQueue('location', location);
        }

        return location;
    }

    getLocationHistory(limit = 100) {
        const data = this.getLocalData();
        const history = data.locationHistory || [];
        return history.slice(-limit);
    }

    getCurrentLocation() {
        const history = this.getLocationHistory(1);
        return history.length > 0 ? history[0] : null;
    }

    // Safety Zones Management
    addSafetyZone(zoneData) {
        const zone = {
            id: this.generateId(),
            name: zoneData.name,
            type: zoneData.type, // 'safe', 'warning', 'danger'
            center: zoneData.center, // {lat, lng}
            radius: zoneData.radius,
            isActive: true,
            createdAt: new Date().toISOString()
        };

        const data = this.getLocalData();
        data.safetyZones = data.safetyZones || [];
        data.safetyZones.push(zone);
        this.saveLocalData(data);

        return zone;
    }

    getSafetyZones() {
        const data = this.getLocalData();
        return data.safetyZones || [];
    }

    // Emergency Contacts Management
    addEmergencyContact(contactData) {
        const contact = {
            id: this.generateId(),
            name: contactData.name,
            phone: contactData.phone,
            email: contactData.email || null,
            relationship: contactData.relationship || 'Emergency Contact',
            isPrimary: contactData.isPrimary || false,
            createdAt: new Date().toISOString()
        };

        const data = this.getLocalData();
        data.emergencyContacts = data.emergencyContacts || [];
        data.emergencyContacts.push(contact);
        this.saveLocalData(data);

        return contact;
    }

    getEmergencyContacts() {
        const data = this.getLocalData();
        return data.emergencyContacts || [];
    }

    // Activity Logging
    logActivity(activityData) {
        const activity = {
            id: this.generateId(),
            type: activityData.type,
            description: activityData.description,
            data: activityData.data || {},
            timestamp: new Date().toISOString()
        };

        const data = this.getLocalData();
        data.activityLog = data.activityLog || [];
        data.activityLog.push(activity);

        // Keep only last 500 activities
        if (data.activityLog.length > 500) {
            data.activityLog = data.activityLog.slice(-500);
        }

        this.saveLocalData(data);
        return activity;
    }

    getRecentActivities(limit = 10) {
        const data = this.getLocalData();
        const activities = data.activityLog || [];
        return activities.slice(-limit).reverse();
    }

    // Emergency Alert System
    async triggerEmergencyAlert(alertData) {
        const alert = {
            id: this.generateId(),
            type: 'emergency',
            location: alertData.location,
            message: alertData.message || 'Emergency assistance needed',
            contacts: this.getEmergencyContacts(),
            timestamp: new Date().toISOString(),
            status: 'active'
        };

        // Log the emergency
        this.logActivity({
            type: 'emergency_alert',
            description: 'Emergency alert triggered',
            data: alert
        });

        // Save alert
        const data = this.getLocalData();
        data.emergencyAlerts = data.emergencyAlerts || [];
        data.emergencyAlerts.push(alert);
        this.saveLocalData(data);

        // Immediate server sync for emergencies
        if (this.isOnline) {
            try {
                await this.syncEmergencyToServer(alert);
            } catch (error) {
                console.error('Failed to sync emergency alert:', error);
            }
        }

        return alert;
    }

    // Community Updates
    addCommunityUpdate(updateData) {
        const update = {
            id: this.generateId(),
            userId: this.getCurrentUser()?.id,
            userName: this.getCurrentUser()?.name || 'Anonymous',
            type: updateData.type || 'safety_tip',
            message: updateData.message,
            location: updateData.location,
            timestamp: new Date().toISOString(),
            likes: 0,
            isVerified: false
        };

        const data = this.getLocalData();
        data.communityUpdates = data.communityUpdates || [];
        data.communityUpdates.push(update);
        this.saveLocalData(data);

        // Sync with server
        if (this.isOnline) {
            this.syncCommunityUpdateToServer(update);
        } else {
            this.addToSyncQueue('community_update', update);
        }

        return update;
    }

    getCommunityUpdates(limit = 20) {
        const data = this.getLocalData();
        const updates = data.communityUpdates || [];
        return updates.slice(-limit).reverse();
    }

    // Route Management
    saveRoute(routeData) {
        const route = {
            id: this.generateId(),
            from: routeData.from,
            to: routeData.to,
            waypoints: routeData.waypoints || [],
            safetyScore: routeData.safetyScore,
            duration: routeData.duration,
            distance: routeData.distance,
            timestamp: new Date().toISOString()
        };

        const data = this.getLocalData();
        data.routes = data.routes || [];
        data.routes.push(route);

        // Keep only last 50 routes
        if (data.routes.length > 50) {
            data.routes = data.routes.slice(-50);
        }

        this.saveLocalData(data);
        return route;
    }

    getRecentRoutes(limit = 10) {
        const data = this.getLocalData();
        const routes = data.routes || [];
        return routes.slice(-limit).reverse();
    }

    // Settings Management
    updateSettings(newSettings) {
        const data = this.getLocalData();
        data.settings = { ...data.settings, ...newSettings };
        this.saveLocalData(data);
        return data.settings;
    }

    getSettings() {
        const data = this.getLocalData();
        return data.settings || {};
    }

    // Sync Queue Management
    addToSyncQueue(type, data) {
        this.syncQueue.push({
            type,
            data,
            timestamp: new Date().toISOString()
        });
    }

    async processSyncQueue() {
        if (!this.isOnline || this.syncQueue.length === 0) return;

        const queue = [...this.syncQueue];
        this.syncQueue = [];

        for (const item of queue) {
            try {
                await this.syncItemToServer(item);
            } catch (error) {
                console.error('Sync failed for item:', item, error);
                // Re-add to queue if sync fails
                this.syncQueue.push(item);
            }
        }
    }

    // Server Sync Methods (implement based on your backend)
    async syncUserToServer(user) {
        // Implement API call to sync user data
        console.log('Syncing user to server:', user);
        // return await fetch(`${this.apiEndpoint}/users`, { method: 'POST', body: JSON.stringify(user) });
    }

    async syncLocationToServer(location) {
        // Implement API call to sync location data
        console.log('Syncing location to server:', location);
        // return await fetch(`${this.apiEndpoint}/locations`, { method: 'POST', body: JSON.stringify(location) });
    }

    async syncEmergencyToServer(alert) {
        // Implement API call to sync emergency alert
        console.log('Syncing emergency alert to server:', alert);
        // return await fetch(`${this.apiEndpoint}/emergency`, { method: 'POST', body: JSON.stringify(alert) });
    }

    async syncCommunityUpdateToServer(update) {
        // Implement API call to sync community update
        console.log('Syncing community update to server:', update);
        // return await fetch(`${this.apiEndpoint}/community`, { method: 'POST', body: JSON.stringify(update) });
    }

    async syncItemToServer(item) {
        switch (item.type) {
            case 'user':
                return await this.syncUserToServer(item.data);
            case 'location':
                return await this.syncLocationToServer(item.data);
            case 'emergency':
                return await this.syncEmergencyToServer(item.data);
            case 'community_update':
                return await this.syncCommunityUpdateToServer(item.data);
            default:
                console.log('Unknown sync item type:', item.type);
        }
    }

    // Network Status Handlers
    handleOnline() {
        this.isOnline = true;
        console.log('Back online - processing sync queue');
        this.processSyncQueue();
    }

    handleOffline() {
        this.isOnline = false;
        console.log('Gone offline - queuing data for sync');
    }

    // Utility Methods
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    calculateSafetyStatus(location) {
        // Implement safety calculation logic
        // This could use various factors like time of day, crime data, etc.
        const hour = new Date().getHours();
        if (hour >= 6 && hour <= 20) {
            return 'safe';
        } else if (hour >= 21 || hour <= 5) {
            return 'caution';
        }
        return 'safe';
    }

    // Data Export/Import for backup
    exportData() {
        const data = this.getLocalData();
        const exportData = {
            ...data,
            exportedAt: new Date().toISOString(),
            version: '1.0'
        };
        return JSON.stringify(exportData, null, 2);
    }

    importData(jsonData) {
        try {
            const importedData = JSON.parse(jsonData);
            // Validate data structure before importing
            if (importedData.user || importedData.settings) {
                this.saveLocalData(importedData);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    // Clear all data (for logout or reset)
    clearAllData() {
        localStorage.removeItem(this.storageKey);
        this.initializeData();
    }

    // Get storage usage statistics
    getStorageStats() {
        const data = this.getLocalData();
        return {
            totalSize: JSON.stringify(data).length,
            locationHistory: data.locationHistory?.length || 0,
            activityLog: data.activityLog?.length || 0,
            communityUpdates: data.communityUpdates?.length || 0,
            routes: data.routes?.length || 0,
            lastSync: data.lastSync
        };
    }
}

// Initialize global data manager
window.rakshitaData = new RakshitaDataManager();