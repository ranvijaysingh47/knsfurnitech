/**
 * database.js — KNS Furnitech | Firestore Database Helper
 * Utility functions to interact with Firebase Firestore.
 */

const KNSDb = (() => {

    // Helper to get db instance
    const getDb = () => window.firebase?.db;

    /**
     * Save a generic document to a collection
     * @param {string} collName - Collection name (e.g., 'inquiries', 'orders')
     * @param {object} data - Data to save
     */
    async function saveDocument(collName, data, customId = null) {
        try {
            const db = getDb();
            if (!db) throw new Error("Firestore not initialized");
 
            const timestamp = new Date().toISOString();
            const documentData = { ...data, timestamp };
 
            let docRef;
            if (customId) {
                // Use setDoc for specific IDs (Preferred for Coupons/Products)
                const docRefTarget = db.doc(db.instance, collName, customId);
                await db.setDoc(docRefTarget, documentData, { merge: true });
                console.log(`✅ Document [${customId}] updated in ${collName}`);
                return { ok: true, id: customId };
            } else {
                // Use addDoc for auto-generated IDs (Inquiries/Orders)
                docRef = await db.addDoc(db.collection(db.instance, collName), documentData);
                console.log(`✅ Document created with ID [${docRef.id}] in ${collName}`);
                await updateSyncMetadata(); // Inform other clients
                return { ok: true, id: docRef.id };
            }
        } catch (e) {
            console.error(`❌ Error saving to ${collName}: `, e);
            return { ok: false, msg: e.message };
        }
    }

    /**
     * Get documents from a collection
     * @param {string} collName 
     */
    async function getDocuments(collName) {
        try {
            const db = getDb();
            if (!db) throw new Error("Firestore not initialized");

            const querySnapshot = await db.getDocs(db.collection(db.instance, collName));
            console.log(`🔍 [KNSDb] Collection '${collName}': Total Docs = ${querySnapshot.size || (querySnapshot.docs ? querySnapshot.docs.length : '?')}`);

            const docs = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log(`   📄 Got Doc [${doc.id}]:`, data);
                docs.push({ ...data, firestoreId: doc.id });
            });
            return docs;
        } catch (e) {
            console.error(`❌ [KNSDb] Error in getDocuments('${collName}'):`, e);
            return [];
        }
    }

    /**
     * Specialized: Save a customer inquiry
     */
    async function saveInquiry(inquiryData) {
        return await saveDocument('inquiries', inquiryData);
    }

    /**
     * Specialized: Save an order
     */
    async function saveOrder(orderData) {
        return await saveDocument('orders', orderData);
    }

    /**
     * Specialized: Get all products from Firestore
     */
    async function getProducts() {
        return await getDocuments('products');
    }

    /**
     * Specialized: Update or create a product (for migration and admin)
     */
    async function saveProduct(id, productData) {
        try {
            const db = getDb();
            if (!db) throw new Error("Firestore not initialized");

            const productRef = db.doc(db.instance, 'products', id);
            await db.setDoc(productRef, {
                ...productData,
                updatedAt: new Date().toISOString()
            }, { merge: true });
            await updateSyncMetadata(); // Inform other clients
            return { ok: true };
        } catch (e) {
            console.error("Error saving product: ", e);
            return { ok: false, msg: e.message };
        }
    }

    /**
     * Specialized: Get orders for a specific user
     */
    async function getOrdersByUser(email) {
        try {
            const db = getDb();
            if (!db) throw new Error("Firestore not initialized");

            const searchEmail = email.toLowerCase().trim();
            const q = db.query(
                db.collection(db.instance, 'orders'),
                db.where('customerEmail', '==', searchEmail)
            );
            
            const querySnapshot = await db.getDocs(q);
            const orders = [];

            querySnapshot.forEach((doc) => {
                orders.push({ ...doc.data(), firestoreId: doc.id });
            });

            return orders.sort((a, b) => {
                const dateA = new Date(a.timestamp || a.date || 0);
                const dateB = new Date(b.timestamp || b.date || 0);
                return dateB - dateA;
            });
        } catch (e) {
            console.error("Error getting user orders: ", e);
            return [];
        }
    }

    /**
     * Save specific user data (like cart or wishlist)
     */
    async function saveUserData(uid, key, data) {
        try {
            const db = getDb();
            if (!db || !uid) {
                console.warn("⚠️ [KNSDb] saveUserData failed: Database or UID missing.");
                return { ok: false, msg: "Database not ready" };
            }
            const docRef = db.doc(db.instance, "users", uid, "private", key);
            await db.setDoc(docRef, { data, updatedAt: new Date().toISOString() });
            return { ok: true };
        } catch (e) {
            console.error(`Error saving user ${key}:`, e);
            return { ok: false, msg: e.message };
        }
    }

    /**
     * Get specific user data (like cart or wishlist)
     */
    async function getUserData(uid, key) {
        try {
            const db = getDb();
            if (!db || !uid) return null;
            const docRef = db.doc(db.instance, "users", uid, "private", key);
            const docSnap = await db.getDoc(docRef);
            return docSnap.exists ? docSnap.data().data : null;
        } catch (e) {
            console.error(`Error getting user ${key}:`, e);
            return null;
        }
    }

    /**
     * Save a product review
     */
    async function saveReview(reviewData) {
        return await saveDocument('reviews', reviewData);
    }

    /**
     * Get reviews for a specific product
     */
    async function getReviewsByProduct(productId) {
        try {
            const db = getDb();
            if (!db) return [];
            const q = db.query(
                db.collection(db.instance, 'reviews'),
                db.where('productId', '==', productId)
            );
            const querySnapshot = await db.getDocs(q);
            const reviews = [];
            querySnapshot.forEach((doc) => {
                reviews.push({ ...doc.data(), firestoreId: doc.id });
            });
            return reviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } catch (e) {
            console.error("Error getting reviews:", e);
            return [];
        }
    }

    /**
     * Delete a document from a collection
     */
    async function deleteDocument(collName, id) {
        try {
            const db = getDb();
            if (!db) throw new Error("Firestore not initialized");

            const docRef = db.doc(db.instance, collName, id);
            await db.deleteDoc(docRef);
            await updateSyncMetadata(); // Inform other clients
            return { ok: true };
        } catch (e) {
            console.error(`Error deleting document from ${collName}: `, e);
            return { ok: false, msg: e.message };
        }
    }

    /**
     * Get a single document from a collection by ID
     */
    async function getDocument(collName, id) {
        try {
            const db = getDb();
            if (!db) throw new Error("Firestore not initialized");

            const docRef = db.doc(db.instance, collName, id);
            const docSnap = await db.getDoc(docRef);
            if (docSnap.exists) {
                return { id: docSnap.id, ...docSnap.data() };
            }
            return null;
        } catch (e) {
            console.error(`Error getting document from ${collName}: `, e);
            return null;
        }
    }

    /**
     * Specialized: Delete a product
     */
    async function deleteProduct(id) {
        return await deleteDocument('products', id);
    }

    /**
     * Specialized: Save a catalog
     */
    async function saveCatalog(id, catalogData) {
        try {
            const db = getDb();
            if (!db) throw new Error("Firestore not initialized");

            const cardRef = db.doc(db.instance, 'catalogs', id);
            await db.setDoc(cardRef, {
                ...catalogData,
                updatedAt: new Date().toISOString()
            }, { merge: true });
            return { ok: true };
        } catch (e) {
            console.error("Error saving catalog: ", e);
            return { ok: false, msg: e.message };
        }
    }

    /**
     * Specialized: Delete a catalog
     */
    async function deleteCatalog(id) {
        return await deleteDocument('catalogs', id);
    }

    /**
     * Specialized: Get all blogs from Firestore
     */
    async function getBlogs() {
        try {
            const db = getDb();
            if (!db) throw new Error("Firestore not initialized");

            const q = db.query(
                db.collection(db.instance, 'blogs'),
                db.orderBy('date', 'desc')
            );
            const querySnapshot = await db.getDocs(q);
            const blogs = [];
            querySnapshot.forEach((doc) => {
                blogs.push({ ...doc.data(), firestoreId: doc.id });
            });
            return blogs;
        } catch (e) {
            console.error("Error getting blogs:", e);
            return [];
        }
    }

    /**
     * Specialized: Save a blog post
     */
    async function saveBlog(blogData) {
        try {
            const db = getDb();
            if (!db) throw new Error("Firestore not initialized");

            if (blogData.firestoreId) {
                const id = blogData.firestoreId;
                delete blogData.firestoreId; // Remove firestoreId before saving
                const blogRef = db.doc(db.instance, 'blogs', id);
                await db.setDoc(blogRef, {
                    ...blogData,
                    updatedAt: new Date().toISOString()
                }, { merge: true });
                await updateSyncMetadata();
            } else {
                await db.addDoc(db.collection(db.instance, 'blogs'), {
                    ...blogData,
                    date: db.serverTimestamp(), // Use db.serverTimestamp() for consistency
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                await updateSyncMetadata();
            }
            return { ok: true };
        } catch (e) {
            console.error("Error saving blog:", e);
            return { ok: false, msg: e.message };
        }
    }

    /**
     * Specialized: Delete a blog post
     */
    async function deleteBlog(id) {
        return await deleteDocument('blogs', id);
    }

    /**
     * Specialized: Delete a review
     */
    async function deleteReview(id) {
        return await deleteDocument('reviews', id);
    }

    /**
     * Specialized: Update order status
     */
    async function updateOrder(id, data) {
        try {
            const db = getDb();
            if (!db) throw new Error("Firestore not initialized");
            const orderRef = db.doc(db.instance, 'orders', id);
            await db.setDoc(orderRef, data, { merge: true });
            await updateSyncMetadata(); // Trigger sync for status changes
            return { ok: true };
        } catch (e) {
            console.error("Error updating order: ", e);
            return { ok: false };
        }
    }

    /**
     * Get the global sync metadata (Heartbeat of the Smart Sync)
     */
    async function getSyncMetadata() {
        return await getDocument('metadata', 'global_sync');
    }

    /**
     * Update the global sync timestamp to trigger re-sync for all clients
     */
    async function updateSyncMetadata() {
        try {
            const db = getDb();
            if (!db) return;
            const ref = db.doc(db.instance, 'metadata', 'global_sync');
            await db.setDoc(ref, {
                lastUpdated: new Date().toISOString(),
                version: Date.now()
            }, { merge: true });
            console.log("🔔 [KNSDb] Global Sync Metadata Updated.");
        } catch (e) {
            console.warn("⚠️ [KNSDb] Metadata update failed. Sync may be delayed.", e);
        }
    }

    return {
        saveDocument, getDocuments, getDocument, deleteDocument, saveInquiry, saveOrder, getProducts,
        saveProduct, deleteProduct, getOrdersByUser, saveUserData, getUserData,
        saveReview, deleteReview, getReviewsByProduct, saveCatalog, deleteCatalog, updateOrder,
        getBlogs, saveBlog, deleteBlog,
        getSyncMetadata, updateSyncMetadata
    };
})();

window.KNSDb = KNSDb;
