/* ================================================================
   admin_data.js — KNS Furnitech | Centralized Data Repository
   Handles PRODUCTS and CATALOGS with localStorage persistence.
   ================================================================ */

const KNSData = (() => {
    const P_KEY = 'kns_products';
    const C_KEY = 'kns_catalogs';
    const R_KEY = 'kns_reviews';
    const U_KEY = 'kns_users';
    const O_KEY = 'kns_orders_all';
    const B_KEY = 'kns_blogs';
    const CP_KEY = 'kns_coupons';

    // Memory-Backed Stores (Resilient against file:// security blocks)
    let _products = JSON.parse(localStorage.getItem(P_KEY)) || [];
    let _catalogs = JSON.parse(localStorage.getItem(C_KEY)) || [];
    let _reviews = JSON.parse(localStorage.getItem(R_KEY)) || [];
    let _users = JSON.parse(localStorage.getItem(U_KEY)) || [];
    let _inquiries = [];
    const I_KEY = 'kns_inquiries';
    let _orders = JSON.parse(localStorage.getItem(O_KEY)) || [];
    let _blogs = JSON.parse(localStorage.getItem(B_KEY)) || [];
    let _coupons = JSON.parse(localStorage.getItem(CP_KEY)) || [];

    const DEFAULT_PRODUCTS = [
        { 
            id:'p1', name:'Tycoon Leatherette Sofa', category:'Sofa Lounge Seating', price:45999, mrp:52000, material:'Leatherette', 
            image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', badge:'New', rating:4.5, isNew:true, 
            description: 'Premium leatherette sofa for luxury living. Features a modular design with high-density foam for maximum comfort.',
            dimensions: { height: '32"', width: '84"', depth: '36"', seatHeight: '18"' },
            colors: [
                { 
                    name: 'Brown', code: '#8B4513', 
                    images: [
                        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
                        'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=600&q=80',
                        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80'
                    ]
                },
                { 
                    name: 'Black', code: '#000000', 
                    images: [
                        'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&q=80',
                        'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80'
                    ]
                }
            ]
        },
        { 
            id:'p2', name:'Zenith King Size Bed', category:'Sofa Lounge Seating', price:32500, mrp:38000, material:'Solid Wood', 
            image:'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80', badge:'', rating:4.8, isNew:false, 
            description: 'Solid wood bed with modern aesthetics and integrated storage drawers. Handcrafted for durability and style.',
            dimensions: { height: '40"', width: '72"', depth: '78"', headboard: '40"' }
        },
        { 
            id:'p3', name:'Apex Ergonomic Desk', category:'Workstation Chair', price:18900, mrp:0, material:'Metal', 
            image:'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80', badge:'Trending', rating:4.6, isNew:false, 
            description: 'Ergonomic metal desk for productivity. Features wire management and a scratch-resistant surface.',
            dimensions: { height: '30"', width: '48"', depth: '24"', legroom: '28"' }
        },
        { id:'p4', name:'Monarch Dining Table Set', category:'Plastic Metal - Cafe Chair', price:54999, mrp:62000, material:'Solid Wood', image:'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80', badge:'', rating:4.7, isNew:true, description: 'Elegant dining set for fine dining.' },
        { id:'p5', name:'Nordic Accent Chair', category:'Workstation Chair', price:12500, mrp:15000, material:'Fabric', image:'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80', badge:'', rating:4.3, isNew:false, description: 'Minimalist fabric chair for modern interiors.' },
        { id:'p6', name:'Heritage Wardrobe', category:'Educational Furniture', price:41000, mrp:48000, material:'Solid Wood', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', badge:'', rating:4.5, isNew:false, description: 'Solid wood wardrobe with maximum storage.' },
        { id:'p7', name:'Minimalist Floor Lamp', category:'Executive Chair', price:4200, mrp:0, material:'Metal', image:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', badge:'', rating:4.2, isNew:false, description: 'Sleek metal lamp for ambient lighting.' },
        { id:'p8', name:'Modular Kitchen Set', category:'Sofa Lounge Seating', price:150000, mrp:180000, material:'Solid Wood', image:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', badge:'Premium', rating:4.9, isNew:true, description: 'Premium modular kitchen for modern homes.' },
        { id:'p9', name:'Comfort Recliner Chair', category:'Executive Chair', price:28500, mrp:33000, material:'Leatherette', image:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', badge:'', rating:4.6, isNew:false, description: 'Adjustable recliner for ultimate relaxation.' },
        { id:'p10', name:'Storage Ottoman', category:'Puffy Table Chair', price:8900, mrp:11000, material:'Fabric', image:'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80', badge:'', rating:4.1, isNew:false, description: 'Compact storage ottoman for living rooms.' },
        { id:'p11', name:'Executive Office Chair', category:'Executive Chair', price:22000, mrp:27000, material:'Leatherette', image:'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=600&q=80', badge:'', rating:4.7, isNew:true, description: 'Premium executive chair for professional workspaces.' },
        { id:'p12', name:'Kids Study Table', category:'Educational Furniture', price:9800, mrp:12000, material:'Solid Wood', image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', badge:'', rating:4.4, isNew:false, description: 'Sturdy study table for budding minds.' }
    ];

    const DEFAULT_CATALOGS = [
        { id:'c1', name:'Executive Collection', category:'Executive Chair', description:'Premium ergonomic chairs for leadership.', image:'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400', pdf:'https://docs.google.com/spreadsheets/d/1-NA_9n-eTnxjor5Gn3SzPqmBG5GDBc-w11Wa5YiLRn4/export?format=xlsx' },
        { id:'c2', name:'Workstation Series', category:'Workstation Chair', description:'Durable seating for task efficiency.', image:'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=400', pdf:'https://docs.google.com/spreadsheets/d/1-NA_9n-eTnxjor5Gn3SzPqmBG5GDBc-w11Wa5YiLRn4/export?format=xlsx' },
        { id:'c3', name:'Cafe & Bistro', category:'Plastic Metal - Cafe Chair', description:'Stylish chairs for collaborative spaces.', image:'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400', pdf:'https://docs.google.com/spreadsheets/d/1-NA_9n-eTnxjor5Gn3SzPqmBG5GDBc-w11Wa5YiLRn4/export?format=xlsx' },
        { id:'c4', name:'Lounge & Sofa', category:'Sofa Lounge Seating', description:'Comfortable seating for relaxation.', image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', pdf:'https://docs.google.com/spreadsheets/d/1-NA_9n-eTnxjor5Gn3SzPqmBG5GDBc-w11Wa5YiLRn4/export?format=xlsx' },
        { id:'c5', name:'Bar Stools', category:'Bar Stool Chair', description:'Modern and sleek stools for bars and counters.', image:'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', pdf:'https://docs.google.com/spreadsheets/d/1-NA_9n-eTnxjor5Gn3SzPqmBG5GDBc-w11Wa5YiLRn4/export?format=xlsx' },
        { id:'c6', name:'Puffy & Tables', category:'Puffy Table Chair', description:'Versatile puffies and accent tables.', image:'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400', pdf:'https://docs.google.com/spreadsheets/d/1-NA_9n-eTnxjor5Gn3SzPqmBG5GDBc-w11Wa5YiLRn4/export?format=xlsx' },
        { id:'c7', name:'Educational Series', category:'Educational Furniture', description:'Ergonomic desks and chairs for classrooms.', image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', pdf:'https://docs.google.com/spreadsheets/d/1-NA_9n-eTnxjor5Gn3SzPqmBG5GDBc-w11Wa5YiLRn4/export?format=xlsx' }
    ];

    // Initialize Products
    try {
        const storedProducts = localStorage.getItem(P_KEY);
        if (!storedProducts) {
            localStorage.setItem(P_KEY, JSON.stringify(DEFAULT_PRODUCTS));
            _products = DEFAULT_PRODUCTS; // Update memory-backed store
        } else {
            const existing = JSON.parse(storedProducts);
            if (Array.isArray(existing)) {
                if (updated) localStorage.setItem(P_KEY, JSON.stringify(existing));
                _products = existing; // Update memory-backed store
            } else {
                // If corrupted, reset to default
                localStorage.setItem(P_KEY, JSON.stringify(DEFAULT_PRODUCTS));
                _products = DEFAULT_PRODUCTS; // Update memory-backed store
            }
        }
    } catch (e) {
        console.error("KNSData Init Error:", e);
        localStorage.setItem(P_KEY, JSON.stringify(DEFAULT_PRODUCTS));
        _products = DEFAULT_PRODUCTS; // Update memory-backed store
    }

    // Initialize Reviews
    try {
        if (!localStorage.getItem(R_KEY)) {
            const initialReviews = [
                { id: 'rev-1', productId: 'p1', userName: 'Amit Sharma', rating: 5, comment: 'Excellent quality! The leatherette feels very premium.', date: new Date().toISOString() },
                { id: 'rev-2', productId: 'p1', userName: 'Neha Gupta', rating: 4, comment: 'Very comfortable, but delivery took a bit long.', date: new Date().toISOString() }
            ];
            localStorage.setItem(R_KEY, JSON.stringify(initialReviews));
            _reviews = initialReviews; // Update memory-backed store
        }

        // Initialize Coupons (Default Sample)
        if (!localStorage.getItem(CP_KEY)) {
            const initialCoupons = [
                { id: 'cp-1', code: 'WELCOME10', type: 'percentage', value: 10, minOrder: 5000, expiry: '2026-12-31', usageLimit: 100, usedCount: 5, status: 'Active' },
                { id: 'cp-2', code: 'FESTIVE500', type: 'fixed', value: 500, minOrder: 10000, expiry: '2026-05-01', usageLimit: 50, usedCount: 12, status: 'Active' }
            ];
            localStorage.setItem(CP_KEY, JSON.stringify(initialCoupons));
            _coupons = initialCoupons;
        }
    } catch (e) {
        console.error("KNSData Reviews Init Error:", e);
        _reviews = []; // Ensure _reviews is an array even on error
    }
    // Initialize Catalogs (Always use static Drive-linked defaults)
    localStorage.setItem(C_KEY, JSON.stringify(DEFAULT_CATALOGS));
    _catalogs = DEFAULT_CATALOGS; // Update memory-backed store

    /* --- Products CRUD --- */
    function getProducts() { return _products; }
    function getProductById(id) { return _products.find(p => p.id === id); }
    function saveProducts(p) { _products = p; localStorage.setItem(P_KEY, JSON.stringify(p)); document.dispatchEvent(new CustomEvent('products:updated')); }
    
    async function addProduct(prod) {
        prod.id = 'p-' + Date.now();
        if (window.KNSDb) await KNSDb.saveProduct(prod.id, prod);
        
        const p = getProducts();
        p.unshift(prod);
        saveProducts(p);
    }
    async function updateProduct(id, updatedProd) {
        if (window.KNSDb) await KNSDb.saveProduct(id, updatedProd);
        
        let p = getProducts();
        const idx = p.findIndex(x => x.id === id);
        if (idx !== -1) {
            p[idx] = { ...p[idx], ...updatedProd };
            saveProducts(p);
        }
    }
    async function deleteProduct(id) {
        if (window.KNSDb) await KNSDb.deleteProduct(id);
        saveProducts(getProducts().filter(x => x.id !== id));
    }

    /* --- Catalogs CRUD --- */
    function getCatalogs() { return _catalogs; }
    function saveCatalogs(c) { _catalogs = c; localStorage.setItem(C_KEY, JSON.stringify(c)); document.dispatchEvent(new CustomEvent('catalogs:updated')); }

    async function addCatalog(cat) {
        cat.id = 'c-' + Date.now();
        if (window.KNSDb) await KNSDb.saveCatalog(cat.id, cat);
        
        const c = getCatalogs();
        c.unshift(cat);
        saveCatalogs(c);
    }
    async function updateCatalog(id, updatedCat) {
        if (window.KNSDb) await KNSDb.saveCatalog(id, updatedCat);
        
        let c = getCatalogs();
        const idx = c.findIndex(x => x.id === id);
        if (idx !== -1) {
            c[idx] = { ...c[idx], ...updatedCat };
            saveCatalogs(c);
        }
    }
    async function deleteCatalog(id) {
        if (window.KNSDb) await KNSDb.deleteCatalog(id);
        saveCatalogs(getCatalogs().filter(x => x.id !== id));
    }

    /* --- Reviews management --- */
    function getReviews() { return _reviews; }
    function saveReviews(r) { _reviews = r; localStorage.setItem(R_KEY, JSON.stringify(r)); document.dispatchEvent(new CustomEvent('reviews:updated')); }
    
    async function addReview(review) {
        review.id = 'rev-' + Date.now();
        review.date = new Date().toISOString();
        if (window.KNSDb) await KNSDb.saveReview(review);

        const r = getReviews();
        r.unshift(review);
        saveReviews(r);
    }
    
    async function deleteReview(id) {
        if (window.KNSDb) await KNSDb.deleteReview(id);
        saveReviews(getReviews().filter(x => x.id !== id));
    }

    /* --- Coupons CRUD --- */
    function getCoupons() { return _coupons; }
    function saveCoupons(cp) { _coupons = cp; localStorage.setItem(CP_KEY, JSON.stringify(cp)); document.dispatchEvent(new CustomEvent('coupons:updated')); }
    
    async function addCoupon(cp) {
        cp.id = 'cp-' + Date.now();
        cp.usedCount = 0;
        cp.status = 'Active';
        if (window.KNSDb) await KNSDb.saveDocument('coupons', cp, cp.id);
        
        const coupons = getCoupons();
        coupons.unshift(cp);
        saveCoupons(coupons);
    }
    async function updateCoupon(id, updatedCp) {
        if (window.KNSDb) await KNSDb.saveDocument('coupons', updatedCp, id);
        
        let coupons = getCoupons();
        const idx = coupons.findIndex(x => x.id === id);
        if (idx !== -1) {
            coupons[idx] = { ...coupons[idx], ...updatedCp };
            saveCoupons(coupons);
        }
    }
    async function deleteCoupon(id) {
        if (window.KNSDb) await KNSDb.deleteDocument('coupons', id);
        saveCoupons(getCoupons().filter(x => x.id !== id));
    }

    /* --- Blogs CRUD --- */
    function getBlogs() { return _blogs; }
    function saveBlogs(b) { _blogs = b; localStorage.setItem(B_KEY, JSON.stringify(b)); document.dispatchEvent(new CustomEvent('blogs:updated')); }
    
    async function addBlog(blog) {
        if (window.KNSDb) {
            const res = await KNSDb.saveBlog(blog);
            if (res.ok) await syncWithCloud();
            return res;
        } else {
            blog.id = 'b-' + Date.now();
            blog.date = new Date().toISOString();
            const b = getBlogs();
            b.unshift(blog);
            saveBlogs(b);
            return { ok: true };
        }
    }
    async function updateBlog(id, updatedBlog) {
        if (window.KNSDb) {
            updatedBlog.firestoreId = id;
            const res = await KNSDb.saveBlog(updatedBlog);
            await syncWithCloud();
            return res;
        } else {
            let b = getBlogs();
            const idx = b.findIndex(x => x.id === id);
            if (idx !== -1) {
                b[idx] = { ...b[idx], ...updatedBlog };
                saveBlogs(b);
            }
            return { ok: true };
        }
    }
    async function deleteBlog(id) {
        let res = { ok: true };
        if (window.KNSDb) res = await KNSDb.deleteBlog(id);
        saveBlogs(getBlogs().filter(x => (x.id || x.firestoreId) !== id));
        return res;
    }

    async function getReviewsForProduct(productId) {
        if (window.KNSDb) {
            const cloudReviews = await KNSDb.getReviewsByProduct(productId);
            if (cloudReviews.length > 0) return cloudReviews;
        }
        return getReviews().filter(r => r.productId === productId);
    }

    /* --- Stats --- */
    function getStats() {
        const stats = {
            totalProducts: _products.length,
            totalCatalogs: _catalogs.length,
            totalUsers: _users.length,
            totalOrders: _orders.length,
            totalBlogs: _blogs.length,
            revenue: _orders.reduce((sum, o) => sum + (o.total || 0), 0)
        };
        console.log("📊 [KNSData] getStats() returning:", stats);
        return stats;
    }
    
    async function syncWithCloud() {
        if (!window.firebase || !window.firebase.db) {
            console.warn("🚫 KNSData: Cannot sync - Firebase not ready.");
            return false;
        }

        const SYNC_META_KEY = 'kns_sync_meta';
        const localMeta = JSON.parse(localStorage.getItem(SYNC_META_KEY) || '{}');
        
        console.log("📡 KNSData: Global Sync Check Started...");
        try {
            // 0. Check Metadata First (Smart Sync)
            const remoteMeta = await KNSDb.getSyncMetadata();
            
            if (remoteMeta && localMeta.version === remoteMeta.version) {
                console.log("⚡ KNSData: Local data is up-to-date. Skipping full sync.");
                return true;
            }

            console.log("🔄 KNSData: Change detected or first sync. Fetching full collections...");

            // 1. Sync Products
            const cloudProducts = await KNSDb.getDocuments('products');
            console.log(`📦 Synced Products: ${cloudProducts.length}`);
            _products = cloudProducts || [];
            localStorage.setItem(P_KEY, JSON.stringify(_products));
            document.dispatchEvent(new CustomEvent('products:updated'));

            // 2. Sync Catalogs
            const cloudCatalogs = await KNSDb.getDocuments('catalogs');
            console.log(`📚 Synced Catalogs: ${cloudCatalogs.length}`);
            _catalogs = cloudCatalogs || [];
            localStorage.setItem(C_KEY, JSON.stringify(_catalogs));
            document.dispatchEvent(new CustomEvent('catalogs:updated'));

            // 3. Sync Reviews
            const cloudReviews = await KNSDb.getDocuments('reviews');
            console.log(`⭐ Synced Reviews: ${cloudReviews.length}`);
            _reviews = cloudReviews || [];
            localStorage.setItem(R_KEY, JSON.stringify(_reviews));
            document.dispatchEvent(new CustomEvent('reviews:updated'));

            // 4. Sync Orders
            const cloudOrders = await KNSDb.getDocuments('orders');
            console.log(`🛒 Synced Orders: ${cloudOrders.length}`);
            _orders = cloudOrders || [];
            localStorage.setItem(O_KEY, JSON.stringify(_orders));
            document.dispatchEvent(new CustomEvent('orders:updated'));

            // 5. Sync Users
            const cloudUsers = await KNSDb.getDocuments('users');
            console.log(`👥 Synced Users: ${cloudUsers.length}`);
            _users = cloudUsers || [];
            localStorage.setItem(U_KEY, JSON.stringify(_users));
            document.dispatchEvent(new CustomEvent('users:updated'));

            // 6. Sync Inquiries
            const cloudInquiries = await KNSDb.getDocuments('inquiries');
            console.log(`✉️ Synced Inquiries: ${cloudInquiries.length}`);
            _inquiries = cloudInquiries || [];
            document.dispatchEvent(new CustomEvent('inquiries:updated'));

            // 7. Sync Blogs
            const cloudBlogs = await KNSDb.getBlogs();
            console.log(`📰 Synced Blogs: ${cloudBlogs.length}`);
            _blogs = cloudBlogs || [];
            localStorage.setItem(B_KEY, JSON.stringify(_blogs));
            document.dispatchEvent(new CustomEvent('blogs:updated'));

            // 8. Sync Coupons
            const cloudCoupons = await KNSDb.getDocuments('coupons');
            console.log(`🎟️ Synced Coupons: ${cloudCoupons.length}`);
            _coupons = cloudCoupons || [];
            localStorage.setItem(CP_KEY, JSON.stringify(_coupons));
            document.dispatchEvent(new CustomEvent('coupons:updated'));

            // Update Local Metadata after successful sync
            if (remoteMeta) {
                localStorage.setItem(SYNC_META_KEY, JSON.stringify(remoteMeta));
            } else {
                // If it's pure first run and no remote meta, trigger one creation
                await KNSDb.updateSyncMetadata();
                const newMeta = await KNSDb.getSyncMetadata();
                if (newMeta) localStorage.setItem(SYNC_META_KEY, JSON.stringify(newMeta));
            }

            console.log("✅ KNSData: Smart Sync Successful.");
            return true;
        } catch (e) {
            console.error("❌ KNSData Sync Exception:", e);
            return false;
        }
    }

    // New Direct Getter for UI
    function getUsers() { return _users; }
    function getAllOrders() { return _orders; }

    return { 
        getProducts, getProductById, addProduct, updateProduct, deleteProduct,
        getCatalogs, addCatalog, updateCatalog, deleteCatalog,
        getReviews, getReviewsForProduct, addReview, deleteReview,
        getStats,
        syncWithCloud,
        getUsers,
        getAllOrders,
        getInquiries: () => _inquiries,
        deleteInquiry: async (id) => {
            const res = await KNSDb.deleteDocument('inquiries', id);
            if (res.ok) {
                _inquiries = _inquiries.filter(i => (i.id || i.firestoreId) !== id);
                document.dispatchEvent(new CustomEvent('inquiries:updated'));
            }
            return res;
        },
        getBlogs, addBlog, updateBlog, deleteBlog,
        getCoupons, addCoupon, updateCoupon, deleteCoupon
    };
})();

// Explicitly attach to global scope
window.KNSData = KNSData;
