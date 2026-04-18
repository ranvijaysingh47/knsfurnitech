/**
 * Firebase Configuration and Initialization
 * Non-Modular (Compat) SDK for compatibility with file:// protocol.
 * This file is loaded as a regular script (not type="module").
 */

(function () {
    const firebaseConfig = {
        apiKey: "AIzaSyBGHjSIlaTKZzAbxmIXqCQlUaowuw-Iz6c",
        authDomain: "kns-furnitech.firebaseapp.com",
        projectId: "kns-furnitech",
        storageBucket: "kns-furnitech.firebasestorage.app",
        messagingSenderId: "271800263963",
        appId: "1:271800263963:web:fd81f172c1ace2c55e1fbe",
        measurementId: "G-GW3NWH1L9G",
        recaptchaSiteKey: "6LfgZqYsAAAAAIARfVd_5xzKFB-IKP513QVxUgIh"
    };

    // Initialize Firebase if not already done (by CDN scripts)
    if (!window.firebase) {
        console.error("Firebase SDK (Compat) not loaded from CDN.");
        return;
    }

    const app = firebase.initializeApp(firebaseConfig);
    const auth = typeof firebase.auth === 'function' ? firebase.auth() : null;
    const db = typeof firebase.firestore === 'function' ? firebase.firestore() : null;


    // Mapping for the existing auth.js and database.js logic
    const _originalFirebase = window.firebase;
    window.firebase = {
        auth: {
            instance: auth,
            signInWithEmailAndPassword: (inst, e, p) => auth ? auth.signInWithEmailAndPassword(e, p) : Promise.reject("Auth not available"),
            createUserWithEmailAndPassword: (inst, e, p) => auth ? auth.createUserWithEmailAndPassword(e, p) : Promise.reject("Auth not available"),
            signOut: () => auth ? auth.signOut() : Promise.resolve(),
            onAuthStateChanged: (inst, cb) => auth ? auth.onAuthStateChanged(cb) : null,
            sendPasswordResetEmail: (inst, e) => auth ? auth.sendPasswordResetEmail(e) : Promise.reject("Auth not available"),
            updateProfile: (user, data) => user ? user.updateProfile(data) : Promise.resolve(),
            signInWithPopup: (inst, provider) => auth ? auth.signInWithPopup(provider) : Promise.reject("Auth not available"),
            googleProvider: (auth && _originalFirebase.auth) ? new _originalFirebase.auth.GoogleAuthProvider() : null
        },
        db: {
            instance: db,
            collection: (inst, path) => db ? db.collection(path) : null,
            addDoc: (ref, data) => ref ? ref.add(data) : Promise.reject("DB not available"),
            getDoc: (ref) => ref ? ref.get() : Promise.reject("DB not available"),
            getDocs: (ref) => ref ? ref.get() : Promise.reject("DB not available"),
            setDoc: (ref, data, opts) => ref ? ref.set(data, opts) : Promise.reject("DB not available"),
            doc: (inst, ...paths) => db ? db.doc(paths.join('/')) : null,
            query: (ref, ...constraints) => {
                let q = ref;
                constraints.forEach(c => {
                    if (c.type === 'where') q = q.where(c.field, c.op, c.val);
                    if (c.type === 'orderBy') q = q.orderBy(c.field, c.dir);
                });
                return q;
            },
            where: (field, op, val) => ({ type: 'where', field, op, val }),
            orderBy: (field, dir = 'asc') => ({ type: 'orderBy', field, dir }),
            deleteDoc: (ref) => ref ? ref.delete() : Promise.resolve(),
            onSnapshot: (ref, cb) => ref ? ref.onSnapshot(cb) : null,
            serverTimestamp: () => _originalFirebase.firestore.FieldValue.serverTimestamp()
        }
    };

    // Override the query logic to handle my specific usage in database.js
    // We'll fix database.js to be simpler for Compat SDK

})();
