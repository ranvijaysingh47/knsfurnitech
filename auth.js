/* ================================================================
   auth.js — KNS Furnitech | Firebase Auth System
   Migrated from localStorage to Firebase.
   ================================================================ */

const KNSAuth = (() => {
    const KEY = 'kns_user';

    // Helper to get auth instance (handles async initialization)
    const getAuth = () => window.knsAuth;
    const getDb = () => window.knsDb;

    function getUser() {
        // 1. Check Memory/Live State
        const liveUser = window.firebase?.auth?.instance?.currentUser;
        if (liveUser) {
            console.log("👤 [Auth] liveUser found:", liveUser.email);
            return {
                name: liveUser.displayName || 'User',
                email: liveUser.email,
                uid: liveUser.uid
            };
        }

        // 2. Fallback to LocalStorage for persistence
        const stored = localStorage.getItem(KEY);
        if (stored) {
            try {
                const u = JSON.parse(stored);
                console.log("📂 [Auth] Cached session found in localStorage:", u.email);
                return u;
            } catch (e) { console.error("Error parsing stored user:", e); }
        } else {
            console.warn("📁 [Auth] No session found in localStorage [KEY: " + KEY + "]");
        }
        return null;
    }

    function isLoggedIn() { return !!getUser(); }

    function isAdmin() {
        const u = getUser();
        return u && (u.email === 'admin@kns.com' || u.isAdmin);
    }

    async function register(name, email, password) {
        try {
            if (!window.firebase) throw new Error("Firebase not loaded");
            const { auth } = window.firebase;

            const userCredential = await auth.createUserWithEmailAndPassword(auth.instance, email, password);
            const user = userCredential.user;

            // Update profile name
            await auth.updateProfile(user, { displayName: name });

            const userData = { name, email, uid: user.uid, createdAt: Date.now() };
            localStorage.setItem(KEY, JSON.stringify(userData));
            document.dispatchEvent(new CustomEvent('auth:changed'));

            return { ok: true };
        } catch (error) {
            console.error("Auth Register Error:", error);
            return { ok: false, msg: error.message };
        }
    }

    async function login(email, password) {
        console.log("🔑 Attempting login for:", email);
        try {
            if (!window.firebase) throw new Error("Firebase not loaded");
            await waitUntilReady();
            const auth = window.firebase?.auth;
            if (!auth) return { ok: false, msg: "Auth service not ready" };

            const res = await auth.signInWithEmailAndPassword(auth.instance, email, password);
            console.log("✅ Login successful for:", email);
            
            const user = res.user;
            const userData = { 
                name: user.displayName || (email.toLowerCase() === 'admin@kns.com' ? 'Administrator' : 'User'), 
                email: user.email, 
                uid: user.uid 
            };
            localStorage.setItem(KEY, JSON.stringify(userData));
            document.dispatchEvent(new CustomEvent('auth:changed'));
            return { ok: true, user: userData };
        } catch (e) {
            console.error("❌ Login failed:", e.code || 'Error', e.message);
            return { ok: false, msg: e.message, code: e.code };
        }
    }

    async function logout() {
        try {
            if (window.firebase) {
                const { auth } = window.firebase;
                await auth.signOut(auth.instance);
            }
            localStorage.removeItem(KEY);
            document.dispatchEvent(new CustomEvent('auth:changed'));
        } catch (error) {
            console.error("Auth Logout Error:", error);
        }
    }

    async function forgotPassword(email) {
        try {
            if (!window.firebase) throw new Error("Firebase not loaded");
            const { auth } = window.firebase;
            await auth.sendPasswordResetEmail(auth.instance, email);
            return { ok: true, msg: "Password reset email sent to " + email };
        } catch (error) {
            return { ok: false, msg: error.message };
        }
    }

    async function loginWithGoogle() {
        try {
            if (!window.firebase) throw new Error("Firebase not loaded");
            const { auth } = window.firebase;

            const result = await auth.signInWithPopup(auth.instance, auth.googleProvider);
            const user = result.user;

            await syncUserProfile(user);

            const userData = {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                photo: user.photoURL
            };

            localStorage.setItem(KEY, JSON.stringify(userData));
            document.dispatchEvent(new CustomEvent('auth:changed'));

            return { ok: true };
        } catch (error) {
            console.error("Auth Google Error:", error);
            return { ok: false, msg: error.message };
        }
    }

    async function syncUserProfile(user) {
        if (!user) return;
        try {
            console.log("🔄 Syncing profile for:", user.email);
            const db = window.firebase?.db;
            if (!db) return;
            
            const userRef = db.doc(db.instance, "users", user.uid);
            // Non-blocking setDoc
            db.setDoc(userRef, {
                name: user.displayName || (user.email.toLowerCase() === 'admin@kns.com' ? 'Administrator' : 'User'),
                email: user.email,
                uid: user.uid,
                lastLogin: new Date().toISOString()
            }, { merge: true }).catch(err => console.warn("Profile sync background error:", err));
            
        } catch (e) {
            console.error("Profile sync exception:", e);
        }
    }

    let _initialized = false;
    let _resolveReady;
    const ready = new Promise(r => { _resolveReady = r; });

    // Initialization: Listen for Auth Changes
    function initAuthStateObserver() {
        if (!window.firebase || !window.firebase.auth) {
            console.log("⏳ Auth: Waiting for Firebase Auth CDN...");
            setTimeout(initAuthStateObserver, 100);
            return;
        }
        const { auth } = window.firebase;

        auth.onAuthStateChanged(auth.instance, async (user) => {
            console.log("👤 Auth State Change:", user ? user.email : "None");
            _initialized = true;
            if (user) {
                const userData = {
                    name: user.displayName || (user.email.toLowerCase() === 'admin@kns.com' ? 'Administrator' : user.email.split('@')[0]),
                    email: user.email,
                    uid: user.uid,
                    photo: user.photoURL
                };
                localStorage.setItem(KEY, JSON.stringify(userData));
                await syncUserProfile(user);
            } 
            document.dispatchEvent(new CustomEvent('auth:changed'));
            if (_resolveReady) {
                _resolveReady();
                _resolveReady = null; 
            }
        });
    }

    initAuthStateObserver();

    async function waitUntilReady() {
        if (_initialized) return true;
        console.log("🚦 Auth: Waiting for readiness...");
        const timeout = new Promise(r => setTimeout(() => {
            console.warn("⚠️ Auth: Readiness timeout reached (3s). Proceeding with cached session.");
            _initialized = true; 
            if (_resolveReady) { _resolveReady(); _resolveReady = null; }
            r();
        }, 3000));
        return Promise.race([ready, timeout]);
    }

    /* ── Address Management ── */
    async function getAddresses() {
        await waitUntilReady();
        const user = getUser();
        if (!user || !user.uid) return [];
        
        // 1. Check if we already have them in localStorage (cached)
        if (user.addresses) return user.addresses;

        // 2. Fetch from Cloud
        if (window.KNSDb) {
            const cloudAddresses = await KNSDb.getUserData(user.uid, 'addresses');
            if (cloudAddresses) {
                user.addresses = cloudAddresses;
                localStorage.setItem(KEY, JSON.stringify(user));
                return cloudAddresses;
            }
        }
        return [];
    }

    async function addAddress(address) {
        await waitUntilReady();
        const user = getUser();
        if (!user || !user.uid) return { ok: false, msg: "User not logged in" };

        const addresses = await getAddresses();
        
        // Generate a simple ID if not present
        if (!address.id) address.id = 'addr-' + Date.now();

        // If this is the first address or set as default, handle default status
        if (addresses.length === 0 || address.isDefault) {
            addresses.forEach(a => a.isDefault = false);
            address.isDefault = true;
        }

        // Add or Update
        const idx = addresses.findIndex(a => {
            if (address.id && a.id === address.id) return true;
            // Check for content match to prevent duplicates
            return a.street.toLowerCase() === address.street.toLowerCase() && 
                   a.city.toLowerCase() === address.city.toLowerCase() && 
                   a.pincode === address.pincode;
        });

        if (idx > -1) {
            // Update existing (merge fields)
            addresses[idx] = { ...addresses[idx], ...address };
            // If the incoming address has no ID but matches an existing one, keep the old ID
            if (!address.id) address.id = addresses[idx].id;
        } else {
            // New Address
            addresses.push(address);
        }

        // Save to Firestore
        if (window.KNSDb) {
            const res = await KNSDb.saveUserData(user.uid, 'addresses', addresses);
            if (!res.ok) return res;
        }

        // Update Local State
        user.addresses = addresses;
        localStorage.setItem(KEY, JSON.stringify(user));
        return { ok: true, addresses };
    }

    async function removeAddress(addressId) {
        await waitUntilReady();
        const user = getUser();
        if (!user || !user.uid) return { ok: false, msg: "User not logged in" };

        let addresses = await getAddresses();
        addresses = addresses.filter(a => a.id !== addressId);

        // Ensure at least one default if we still have addresses
        if (addresses.length > 0 && !addresses.find(a => a.isDefault)) {
            addresses[0].isDefault = true;
        }

        if (window.KNSDb) {
            const res = await KNSDb.saveUserData(user.uid, 'addresses', addresses);
            if (!res.ok) return res;
        }

        user.addresses = addresses;
        localStorage.setItem(KEY, JSON.stringify(user));
        return { ok: true, addresses };
    }

    async function setDefaultAddress(addressId) {
        await waitUntilReady();
        const user = getUser();
        if (!user || !user.uid) return { ok: false, msg: "User not logged in" };

        const addresses = await getAddresses();
        addresses.forEach(a => {
            a.isDefault = (a.id === addressId);
        });

        if (window.KNSDb) {
            const res = await KNSDb.saveUserData(user.uid, 'addresses', addresses);
            if (!res.ok) return res;
        }

        user.addresses = addresses;
        localStorage.setItem(KEY, JSON.stringify(user));
        return { ok: true, addresses };
    }

    const authExport = { getUser, isLoggedIn, isAdmin, register, login, loginWithGoogle, logout, forgotPassword, waitUntilReady, getAddresses, addAddress, removeAddress, setDefaultAddress };
    window.KNSAuth = authExport;
    return authExport;
})();

/* ── UI Init ── */
document.addEventListener('DOMContentLoaded', renderAuthNav);
document.addEventListener('auth:changed', renderAuthNav);

function renderAuthNav() {
    const user = KNSAuth.getUser();
    document.querySelectorAll('.kns-auth-slot').forEach(slot => {
        if (user) {
            slot.innerHTML = `
              <div class="kns-profile-wrap">
                <button class="kns-icon-btn kns-profile-btn" id="knsProfileBtn" aria-label="Profile" title="My Account">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <span class="kns-profile-name">${user.name.split(' ')[0]}</span>
                </button>
                <div class="kns-profile-dropdown" id="knsProfileDropdown">
                  <div class="kns-pd-header">
                    <div class="kns-pd-avatar">${user.name[0].toUpperCase()}</div>
                    <div>
                      <div class="kns-pd-name">${user.name}</div>
                      <div class="kns-pd-email">${user.email}</div>
                    </div>
                  </div>
                  <div class="kns-pd-divider"></div>
                  ${KNSAuth.isAdmin() ? `
                  <a href="admin.html" class="kns-pd-link" style="color: #8CC63F; font-weight:700;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    Admin Dashboard
                  </a>
                  <div class="kns-pd-divider"></div>
                  ` : ''}
                  <a href="profile.html" class="kns-pd-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    My Profile
                  </a>
                  <a href="orders.html" class="kns-pd-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                    My Orders
                  </a>
                  <a href="wishlist.html" class="kns-pd-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    My Wishlist
                  </a>
                  <a href="cart.html" class="kns-pd-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    My Cart
                  </a>
                  <div class="kns-pd-divider"></div>
                  <button class="kns-pd-link kns-pd-logout" onclick="KNSAuth.logout()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Sign Out
                  </button>
                </div>
              </div>`;

            document.getElementById('knsProfileBtn')?.addEventListener('click', e => {
                e.stopPropagation();
                document.getElementById('knsProfileDropdown')?.classList.toggle('is-open');
            });
        } else {
            slot.innerHTML = `
              <a href="signin.html" class="kns-icon-btn" id="knsLoginBtn" title="Sign In / Register" aria-label="Sign In">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </a>`;
        }
    });
}

/* Close dropdown when clicking outside */
document.addEventListener('click', () => {
    document.querySelectorAll('.kns-profile-dropdown.is-open').forEach(d => d.classList.remove('is-open'));
});

// Legacy support for modal triggers (now redirects)
function openAuthModal(tab = 'login') {
    window.location.href = tab === 'register' ? 'signup.html' : 'signin.html';
}

function handleLogin(e) {
    // This is now handled by the inline scripts in signin.html
    // Keeping for backwards compatibility if any page still has the old form
    e.preventDefault();
}
