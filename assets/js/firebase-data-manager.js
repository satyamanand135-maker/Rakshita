// Firebase Data Manager for Rakshita
class FirebaseDataManager {
    constructor() {
        this.isInitialized = false;
        this.currentUser = null;
        this.unsubscribers = [];
        
        // Initialize Firebase when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeFirebase());
        } else {
            this.initializeFirebase();
        }
    }

    async initializeFirebase() {
        try {
            // Import Firebase modules (using CDN for simplicity)
            const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
            const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
            const { getFirestore, collection, doc, setDoc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, onSnapshot, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');

            // Firebase configuration
         const firebaseConfig = {
    apiKey: "AIzaSyAcRWW37Yk_la-9Ty0G24mSoS5BL6h5mXw",
    authDomain: "rakshita-safety.firebaseapp.com",
    projectId: "rakshita-safety",
    storageBucket: "rakshita-safety.firebasestorage.app",
    messagingSenderId: "686001055646",
    appId: "1:686001055646:web:d8c811390ee14b9b71588f",
    measurementId: "G-9MZ37VFJR8"
  };

            // Initialize Firebase
            this.app = initializeApp(firebaseConfig);
            this.auth = getAuth(this.app);
            this.db = getFirestore(this.app);

            // Store Firebase functions for use
            this.firebase = {
                createUserWithEmailAndPassword,
                signInWithEmailAndPassword,
                signOut,
                onAuthStateChanged,
                collection,
                doc,
                setDoc,
                getDoc,
                getDocs,
                addDoc,
                updateDoc,
                deleteDoc,
                query,
                where,
                orderBy,
                limit,
                onSnapshot,
                serverTimestamp
            };

            // Set up auth state listener
            this.firebase.onAuthStateChanged(this.auth, (user) => {
                this.currentUser = user;
                this.handleAuthStateChange(user);
            });

            this.isInitialized = true;
            console.log('Firebase initialized successfully');
            
        } catch (error) {
            console.error('Firebase initialization failed:', error);
            // Fallback to local storage
            this.initializeLocalFallback();
        }
    }

    initializeLocalFallback() {
        console.log('Using local storage fallback');
        this.isInitialized = true;
        // Use the existing local data manager as fallback
        if (window.rakshitaData) {
            this.localManager = window.rakshitaData;
        }
    }

    handleAuthStateChange(user) {
        if (user) {
            console.log('User signed in:', user.email);
            // Update UI for logged in user
            if (window.updateUIForLoggedInUser) {
                window.updateUIForLoggedInUser();
            }
        } else {
            console.log('User signed out');
        }
    }

    // Authentication Methods
    async registerUser(userData) {
        try {
            if (!this.isInitialized) {
                throw new Error('Firebase not initialized');
            }

            // Create user account
            const userCredential = await this.firebase.createUserWithEmailAndPassword(
                this.auth, 
                userData.email, 
                userData.password
            );

            const user = userCredential.user;

            // Save additional user data to Firestore
            const userProfile = {
                uid: user.uid,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                emergencyContact: userData.emergencyContact,
                createdAt: this.firebase.serverTimestamp(),
                isActive: true,
                settings: {
                    locationSharing: true,
                    emergencyAlerts: true,
                    communityUpdates: true,
                    safetyZoneAlerts: true,
                    trackingEnabled: true
                }
            };

            await this.firebase.setDoc(
                this.firebase.doc(this.db, 'users', user.uid), 
                userProfile
            );

            // Add emergency contact
            await this.addEmergencyContact(user.uid, {
                name: 'Primary Emergency Contact',
                phone: userData.emergencyContact,
                isPrimary: true
            });

            return {
                id: user.uid,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                emergencyContact: userData.emergencyContact
            };

        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    async loginUser(email, password) {
        try {
            if (!this.isInitialized) {
                throw new Error('Firebase not initialized');
            }

            const userCredential = await this.firebase.signInWithEmailAndPassword(
                this.auth, 
                email, 
                password
            );

            const user = userCredential.user;

            // Get user profile from Firestore
            const userDoc = await this.firebase.getDoc(
                this.firebase.doc(this.db, 'users', user.uid)
            );

            if (userDoc.exists()) {
                const userData = userDoc.data();
                return {
                    id: user.uid,
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    emergencyContact: userData.emergencyContact
                };
            } else {
                throw new Error('User profile not found');
            }

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async logoutUser() {
        try {
            if (this.auth) {
                await this.firebase.signOut(this.auth);
            }
            this.currentUser = null;
            
            // Clean up listeners
            this.unsubscribers.forEach(unsubscribe => unsubscribe());
            this.unsubscribers = [];
            
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    getCurrentUser() {
        if (this.currentUser) {
            return {
                id: this.currentUser.uid,
                email: this.currentUser.email
            };
        }
        return null;
    }

    // Location Management
    async saveLocation(locationData) {
        try {
            if (!this.currentUser) {
                throw new Error('User not authenticated');
            }

            const location = {
                userId: this.currentUser.uid,
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                accuracy: locationData.accuracy,
                timestamp: this.firebase.serverTimestamp(),
                address: locationData.address || null,
                safetyStatus: this.calculateSafetyStatus(locationData)
            };

            const docRef = await this.firebase.addDoc(
                this.firebase.collection(this.db, 'locations'), 
                location
            );

            return {
                id: docRef.id,
                ...location,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Error saving location:', error);
            throw error;
        }
    }

    async getLocationHistory(limit = 100) {
        try {
            if (!this.currentUser) {
                return [];
            }

            const q = this.firebase.query(
                this.firebase.collection(this.db, 'locations'),
                this.firebase.where('userId', '==', this.currentUser.uid),
                this.firebase.orderBy('timestamp', 'desc'),
                this.firebase.limit(limit)
            );

            const querySnapshot = await this.firebase.getDocs(q);
            const locations = [];

            querySnapshot.forEach((doc) => {
                locations.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return locations;

        } catch (error) {
            console.error('Error getting location history:', error);
            return [];
        }
    }

    // Emergency Alert System
    async triggerEmergencyAlert(alertData) {
        try {
            if (!this.currentUser) {
                throw new Error('User not authenticated');
            }

            const alert = {
                userId: this.currentUser.uid,
                type: 'emergency',
                location: alertData.location,
                message: alertData.message || 'Emergency assistance needed',
                timestamp: this.firebase.serverTimestamp(),
                status: 'active',
                resolved: false
            };

            const docRef = await this.firebase.addDoc(
                this.firebase.collection(this.db, 'emergencyAlerts'), 
                alert
            );

            // Log activity
            await this.logActivity({
                type: 'emergency_alert',
                description: 'Emergency alert triggered',
                data: { alertId: docRef.id }
            });

            return {
                id: docRef.id,
                ...alert,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Error triggering emergency alert:', error);
            throw error;
        }
    }

    // Activity Logging
    async logActivity(activityData) {
        try {
            if (!this.currentUser) {
                return null;
            }

            const activity = {
                userId: this.currentUser.uid,
                type: activityData.type,
                description: activityData.description,
                data: activityData.data || {},
                timestamp: this.firebase.serverTimestamp()
            };

            const docRef = await this.firebase.addDoc(
                this.firebase.collection(this.db, 'activities'), 
                activity
            );

            return {
                id: docRef.id,
                ...activity,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Error logging activity:', error);
            return null;
        }
    }

    async getRecentActivities(limit = 10) {
        try {
            if (!this.currentUser) {
                return [];
            }

            const q = this.firebase.query(
                this.firebase.collection(this.db, 'activities'),
                this.firebase.where('userId', '==', this.currentUser.uid),
                this.firebase.orderBy('timestamp', 'desc'),
                this.firebase.limit(limit)
            );

            const querySnapshot = await this.firebase.getDocs(q);
            const activities = [];

            querySnapshot.forEach((doc) => {
                activities.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return activities;

        } catch (error) {
            console.error('Error getting activities:', error);
            return [];
        }
    }

    // Community Updates
    async addCommunityUpdate(updateData) {
        try {
            if (!this.currentUser) {
                throw new Error('User not authenticated');
            }

            // Get user profile for name
            const userDoc = await this.firebase.getDoc(
                this.firebase.doc(this.db, 'users', this.currentUser.uid)
            );
            const userData = userDoc.data();

            const update = {
                userId: this.currentUser.uid,
                userName: userData?.name || 'Anonymous',
                type: updateData.type || 'safety_tip',
                message: updateData.message,
                location: updateData.location,
                timestamp: this.firebase.serverTimestamp(),
                likes: 0,
                isVerified: false
            };

            const docRef = await this.firebase.addDoc(
                this.firebase.collection(this.db, 'communityUpdates'), 
                update
            );

            return {
                id: docRef.id,
                ...update,
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            console.error('Error adding community update:', error);
            throw error;
        }
    }

    async getCommunityUpdates(limit = 20) {
        try {
            const q = this.firebase.query(
                this.firebase.collection(this.db, 'communityUpdates'),
                this.firebase.orderBy('timestamp', 'desc'),
                this.firebase.limit(limit)
            );

            const querySnapshot = await this.firebase.getDocs(q);
            const updates = [];

            querySnapshot.forEach((doc) => {
                updates.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return updates;

        } catch (error) {
            console.error('Error getting community updates:', error);
            return [];
        }
    }

    // Emergency Contacts
    async addEmergencyContact(userId, contactData) {
        try {
            const contact = {
                userId: userId || this.currentUser?.uid,
                name: contactData.name,
                phone: contactData.phone,
                email: contactData.email || null,
                relationship: contactData.relationship || 'Emergency Contact',
                isPrimary: contactData.isPrimary || false,
                createdAt: this.firebase.serverTimestamp()
            };

            const docRef = await this.firebase.addDoc(
                this.firebase.collection(this.db, 'emergencyContacts'), 
                contact
            );

            return {
                id: docRef.id,
                ...contact
            };

        } catch (error) {
            console.error('Error adding emergency contact:', error);
            throw error;
        }
    }

    async getEmergencyContacts() {
        try {
            if (!this.currentUser) {
                return [];
            }

            const q = this.firebase.query(
                this.firebase.collection(this.db, 'emergencyContacts'),
                this.firebase.where('userId', '==', this.currentUser.uid)
            );

            const querySnapshot = await this.firebase.getDocs(q);
            const contacts = [];

            querySnapshot.forEach((doc) => {
                contacts.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return contacts;

        } catch (error) {
            console.error('Error getting emergency contacts:', error);
            return [];
        }
    }

    // Settings Management
    async updateSettings(newSettings) {
        try {
            if (!this.currentUser) {
                throw new Error('User not authenticated');
            }

            await this.firebase.updateDoc(
                this.firebase.doc(this.db, 'users', this.currentUser.uid),
                { settings: newSettings }
            );

            return newSettings;

        } catch (error) {
            console.error('Error updating settings:', error);
            throw error;
        }
    }

    async getSettings() {
        try {
            if (!this.currentUser) {
                return {};
            }

            const userDoc = await this.firebase.getDoc(
                this.firebase.doc(this.db, 'users', this.currentUser.uid)
            );

            if (userDoc.exists()) {
                return userDoc.data().settings || {};
            }

            return {};

        } catch (error) {
            console.error('Error getting settings:', error);
            return {};
        }
    }

    // Real-time listeners
    subscribeToLocationUpdates(callback) {
        if (!this.currentUser) return null;

        const q = this.firebase.query(
            this.firebase.collection(this.db, 'locations'),
            this.firebase.where('userId', '==', this.currentUser.uid),
            this.firebase.orderBy('timestamp', 'desc'),
            this.firebase.limit(1)
        );

        const unsubscribe = this.firebase.onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                callback({
                    id: doc.id,
                    ...doc.data()
                });
            });
        });

        this.unsubscribers.push(unsubscribe);
        return unsubscribe;
    }

    subscribeToCommunityUpdates(callback) {
        const q = this.firebase.query(
            this.firebase.collection(this.db, 'communityUpdates'),
            this.firebase.orderBy('timestamp', 'desc'),
            this.firebase.limit(10)
        );

        const unsubscribe = this.firebase.onSnapshot(q, (querySnapshot) => {
            const updates = [];
            querySnapshot.forEach((doc) => {
                updates.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            callback(updates);
        });

        this.unsubscribers.push(unsubscribe);
        return unsubscribe;
    }

    // Utility Methods
    calculateSafetyStatus(location) {
        // Simple safety calculation based on time of day
        const hour = new Date().getHours();
        if (hour >= 6 && hour <= 20) {
            return 'safe';
        } else if (hour >= 21 || hour <= 5) {
            return 'caution';
        }
        return 'safe';
    }

    // Cleanup
    destroy() {
        this.unsubscribers.forEach(unsubscribe => unsubscribe());
        this.unsubscribers = [];
    }
}

// Initialize Firebase Data Manager
window.firebaseDataManager = new FirebaseDataManager();