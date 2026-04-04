/* ================================================================
   admin.js — KNS Furnitech | Admin Dashboard Logic
   Powers the sidebar, tabs, and all management screens.
   ================================================================ */
document.addEventListener('DOMContentLoaded', async () => {
    console.log("🚀 [System] admin.js: DOMContentLoaded Fired. Starting up...");

    // 1. Immediate UI Fix: Draw icons first so they don't look empty
    if (window.lucide) {
        console.log("🎨 [UI] Initializing Lucide Icons...");
        lucide.createIcons();
    }

    // 2. IMMEDIATE Listeners (Before Auth)
    console.log("🛠️ [System] admin.js: Registering Data Listeners... [PRE-AUTH]");
    document.addEventListener('products:updated', () => { console.log("🔔 [Event] Products Update received"); refreshDashboard(); renderProductsTable(); });
    document.addEventListener('catalogs:updated', () => { console.log("🔔 [Event] Catalogs Update received"); refreshDashboard(); renderCatalogsTable(); });
    document.addEventListener('reviews:updated', () => { console.log("🔔 [Event] Reviews Update received"); refreshDashboard(); renderReviewsTable(); });
    document.addEventListener('orders:updated', () => { console.log("🔔 [Event] Orders Update received"); refreshDashboard(); renderOrdersTable(); });
    document.addEventListener('users:updated', () => { console.log("🔔 [Event] Users Update received"); refreshDashboard(); renderUsersTable(); });
    document.addEventListener('blogs:updated', () => { console.log("🔔 [Event] Blogs Update received"); refreshDashboard(); renderBlogsTable(); });
    document.addEventListener('coupons:updated', () => { console.log("🔔 [Event] Coupons Update received"); renderCouponsTable(); });

    // 3. Early Render & Interactivity
    console.log("💨 [System] Triggering Early Render & Interactivity...");
    initTabs();
    refreshDashboard();
    renderProductsTable();
    renderUsersTable();
    renderCatalogsTable();
    renderOrdersTable();
    renderReviewsTable();
    renderBlogsTable();
    renderCouponsTable();

    // Reset Bulk Actions UI on load
    updateBulkActionBar('products');
    updateBulkActionBar('coupons');

    // 4. Intensive Auth Readiness Poll
    console.log("🔐 [Auth] Checking Session Authorization...");
    let waitAttempts = 0;
    const maxWait = 100; // 10 seconds (100ms * 100)

    async function waitForAdmin() {
        if (window.KNSAuth && KNSAuth.waitUntilReady) {
            await KNSAuth.waitUntilReady();
        }

        while (waitAttempts < maxWait) {
            const user = (window.KNSAuth && window.KNSAuth.getUser) ? window.KNSAuth.getUser() : null;
            if (user) {
                console.log("👤 [Auth] User detected during poll:", user.email);
                if (window.KNSAuth.isAdmin()) {
                    console.log("✅ [Auth] Admin Authorized.");
                    return true;
                }
                console.warn("🚫 [Auth] User detected but is not Admin");
                return false;
            }
            waitAttempts++;
            await new Promise(r => setTimeout(r, 100));
        }
        return false;
    }

    console.log("🔄 [System] Awaiting Authorization (Non-Blocking for UI)...");
    const isAuthorized = await waitForAdmin();
    console.log(`🔐 [Auth] Final Authorization Result: ${isAuthorized}`);

    // 5. Final Security Check
    if (!isAuthorized) {
        const currentUser = (window.KNSAuth && KNSAuth.getUser) ? KNSAuth.getUser() : null;
        const email = currentUser ? currentUser.email : 'None';

        console.error("🔐 Security Violation Trace:", {
            loggedIn: !!currentUser,
            email: email,
            isAdminExpected: 'admin@kns.com',
            waitAttempts
        });

        // We show the warning but allow it to run anyway if it took too long (Emergency Bypass for Visibility)
        alert(`Unauthorized access.\nYour session: ${email}\nRequired: admin@kns.com\n\nReturning to Home.`);
        window.location.href = 'index.html';
        return;
    }

    document.addEventListener('inquiries:updated', renderInquiriesTable);

    // Final UI cleanup
    if (window.lucide) lucide.createIcons();

    // Initial Refresh
    renderInquiriesTable();
    refreshDashboard();

    // Initial Background Sync
    setTimeout(handleManualSync, 1000);
});

// Manual Sync Handler (Requested by User)
async function handleManualSync() {
    const btn = document.querySelector('.btn-sync');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Syncing...';
    }

    if (window.KNSData && KNSData.syncWithCloud) {
        console.log("🔄 [System] Manual sync triggered...");
        const success = await KNSData.syncWithCloud();
        if (success) {
            refreshDashboard();
            if (window.KNSCart) KNSCart.showToast("Cloud sync successful!");
        } else {
            if (window.KNSCart) KNSCart.showToast("Sync failed. Check console.");
        }
    }

    if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i data-lucide="refresh-cw"></i> Sync with Cloud';
    }
    if (window.lucide) lucide.createIcons();
}
window.handleManualSync = handleManualSync;

/* --- Tab Management --- */
let revenueChartInstance = null;
let categoryChartInstance = null;

function initTabs() {
    const navItems = document.querySelectorAll('.admin-nav-item');
    const sections = document.querySelectorAll('.admin-section');
    const titles = {
        'dashboard': { h1: 'Dashboard Overview', p: "Welcome back, Administrator. Here's what's happening today." },
        'products': { h1: 'Product Management', p: 'Add, update and manage your furniture inventory.' },
        'catalogs': { h1: 'Catalog Assets', p: 'Manage your downloadable design catalogs and brochures.' },
        'orders': { h1: 'Order History', p: 'View and manage all customer transactions across the site.' },
        'users': { h1: 'User Directory', p: 'Manage your registered customers and their profiles.' },
        'reviews': { h1: 'Customer Reviews', p: 'Moderate and manage product reviews submitted by customers.' },
        'inquiries': { h1: 'Customer Inquiries', p: 'Track and manage product inquiries and consultation requests.' },
        'blogs': { h1: 'Blog Management', p: 'Create and manage articles for your website blog.' },
        'promotions': { h1: 'Promotion Manager', p: 'Create and manage discount coupons, expiry dates and usage limits.' }
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.dataset.tab;
            if (!tab) return;

            // Update UI
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            sections.forEach(s => {
                s.classList.remove('active');
                if (s.id === `tab-${tab}`) s.classList.add('active');
            });

            // Update Header
            const info = titles[tab];
            if (info) {
                document.getElementById('pageTitle').textContent = info.h1;
                document.getElementById('pageDesc').textContent = info.p;
            }

            if (window.lucide) lucide.createIcons();
        });
    });
}

/* --- Dashboard Refresh --- */
function refreshDashboard() {
    try {
        const stats = (window.KNSData && KNSData.getStats) ? KNSData.getStats() : { revenue: 0, totalOrders: 0, totalUsers: 0, totalProducts: 0 };

        const revElem = document.getElementById('stat-revenue');
        const ordElem = document.getElementById('stat-orders');
        const usrElem = document.getElementById('stat-users');
        const prdElem = document.getElementById('stat-products');

        if (revElem) revElem.textContent = '₹ ' + (stats.revenue || 0).toLocaleString('en-IN');
        if (ordElem) ordElem.textContent = stats.totalOrders || 0;
        if (usrElem) usrElem.textContent = stats.totalUsers || 0;
        if (prdElem) prdElem.textContent = stats.totalProducts || 0;

        // Render Recent Orders in Dashboard
        const allOrders = (window.KNSData && KNSData.getAllOrders ? KNSData.getAllOrders() : getAllOrders());
        const dashOrders = allOrders.slice(0, 5);
        const tbody = document.getElementById('dash-recent-orders');

        // Update Visual Charts
        initCharts(allOrders);

        // Update Active Users Widget (NEW)
        const users = (window.KNSData && KNSData.getUsers) ? KNSData.getUsers() : [];
        renderActiveUsers(users);

        if (!tbody) return;

        tbody.innerHTML = dashOrders.map(o => `
        <tr>
            <td data-label="Order ID" style="font-weight:600;">#ORD-${(o.id || o.orderNumber || o.firestoreId || '').replace('#ORD-', '').replace('#KNS-', '').slice(-6)}</td>
            <td data-label="Customer">${o.customerName || o.userName || 'Guest'}</td>
            <td data-label="Total">₹ ${(o.total || 0).toLocaleString('en-IN')}</td>
            <td data-label="Status"><span class="status-badge confirmed">Success</span></td>
        </tr>
    `).join('') || '<tr><td colspan="4" style="text-align:center; padding: 2rem; color: #888;">No recent orders.</td></tr>';
    } catch (e) {
        console.warn("⚠️ [UI] Dashboard Refresh encountered an error:", e);
    }
}

function initCharts(orders) {
    if (!window.Chart || !orders) return;

    // 1. Process Data for Revenue Line Chart (Daily)
    const revenueMap = {};
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const label = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
        revenueMap[label] = 0;
        last7Days.push(label);
    }

    orders.forEach(o => {
        const rawDate = o.timestamp || o.date;
        if (!rawDate) return;
        const d = new Date(rawDate);
        const label = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
        if (revenueMap.hasOwnProperty(label)) {
            revenueMap[label] += (parseFloat(o.total) || 0);
        }
    });

    const revenueData = last7Days.map(day => revenueMap[day]);

    // 2. Process Data for Category Doughnut Chart
    const categoryMap = {};
    orders.forEach(o => {
        if (o.items && Array.isArray(o.items)) {
            o.items.forEach(item => {
                const cat = item.category || 'Other';
                categoryMap[cat] = (categoryMap[cat] || 0) + 1;
            });
        }
    });

    const categories = Object.keys(categoryMap);
    const categoryCounts = Object.values(categoryMap);

    // 3. Render/Update Revenue Chart
    const revCtx = document.getElementById('revenueChart')?.getContext('2d');
    if (revCtx) {
        if (revenueChartInstance) revenueChartInstance.destroy();
        revenueChartInstance = new Chart(revCtx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [{
                    label: 'Daily Revenue (₹)',
                    data: revenueData,
                    borderColor: '#8CC63F',
                    backgroundColor: 'rgba(140, 198, 63, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#8CC63F',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        ticks: { callback: value => '₹' + value.toLocaleString('en-IN') }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // 4. Render/Update Category Chart
    const catCtx = document.getElementById('categoryChart')?.getContext('2d');
    if (catCtx) {
        if (categoryChartInstance) categoryChartInstance.destroy();
        categoryChartInstance = new Chart(catCtx, {
            type: 'doughnut',
            data: {
                labels: categories,
                datasets: [{
                    data: categoryCounts,
                    backgroundColor: [
                        '#8CC63F', '#1A1A1A', '#FFB74D', '#4DB6AC', '#7986CB', '#E57373', '#9575CD'
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true, padding: 20 }
                    }
                },
                cutout: '70%'
            }
        });
    }

    // 5. Product Performance Chart (NEW - Advanced Analytics)
    const prodCtx = document.getElementById('productChart')?.getContext('2d');
    if (prodCtx) {
        const productStats = {};
        orders.forEach(o => {
            if (o.items) o.items.forEach(item => {
                productStats[item.name] = (productStats[item.name] || 0) + (item.quantity || 1);
            });
        });
        const sortedProducts = Object.entries(productStats).sort((a,b) => b[1]-a[1]).slice(0, 5);

        new Chart(prodCtx, {
            type: 'bar',
            data: {
                labels: sortedProducts.map(p => p[0]),
                datasets: [{
                    label: 'Units Sold',
                    data: sortedProducts.map(p => p[1]),
                    backgroundColor: '#8CC63F',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, grid: { display:false } }, x: { grid: { display:false } } }
            }
        });
    }

    // 6. Monthly Growth Chart (NEW - Advanced Analytics)
    const growthCtx = document.getElementById('growthChart')?.getContext('2d');
    if (growthCtx) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentYear = new Date().getFullYear();
        const monthlyData = new Array(12).fill(0);
        
        orders.forEach(o => {
            const d = new Date(o.timestamp || o.date);
            if (d.getFullYear() === currentYear) {
                monthlyData[d.getMonth()] += (o.total || 0);
            }
        });

        new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Monthly Revenue (₹)',
                    data: monthlyData,
                    borderColor: '#1A1A1A',
                    backgroundColor: 'rgba(26, 26, 26, 0.05)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { 
                    y: { ticks: { callback: v => '₹' + (v/1000) + 'k' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}

function renderActiveUsers(users) {
    const container = document.getElementById('dash-active-users');
    if (!container) return;

    if (!users || !users.length) {
        container.innerHTML = '<p style="text-align:center; color:#888; padding: 1rem;">No recent user sessions.</p>';
        return;
    }

    // Sort by most recent activity (login or creation)
    const active = [...users]
        .sort((a, b) => (b.lastLogin || b.createdAt || 0) - (a.lastLogin || a.createdAt || 0))
        .slice(0, 4);

    container.innerHTML = active.map(u => {
        const name = u.name || 'Anonymous';
        const initial = (name[0] || '?').toUpperCase();
        // Assume active if last activity within 24 hours (simulated relative to latest data)
        const lastActive = u.lastLogin || u.createdAt || Date.now();
        const isActive = (Date.now() - lastActive) < (24 * 60 * 60 * 1000);

        return `
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:1.2rem; background:#f9f9f9; padding:10px; border-radius:10px;">
                <div style="position:relative;">
                    <div class="admin-avatar" style="width:36px; height:36px; font-size:0.9rem;">${initial}</div>
                    ${isActive ? '<span style="position:absolute; bottom:0; right:0; width:10px; height:10px; background:#8CC63F; border:2px solid #f9f9f9; border-radius:50%;"></span>' : ''}
                </div>
                <div style="flex:1;">
                    <div style="font-weight:600; font-size:0.9rem;">${name}</div>
                    <div style="font-size:0.75rem; color:#888;">${(u.email || '').substring(0, 20)}...</div>
                </div>
                <div style="font-size:0.75rem; color:${isActive ? '#8CC63F' : '#aaa'}; font-weight:700;">
                    ${isActive ? 'Active' : 'Offline'}
                </div>
            </div>
        `;
    }).join('');
}

/* --- Products CRUD --- */
function renderProductsTable() {
    const query = (document.getElementById('prod-search').value || '').toLowerCase();
    const allProducts = KNSData.getProducts() || [];
    const products = allProducts.filter(p =>
        (p.name || '').toLowerCase().includes(query) || (p.category || '').toLowerCase().includes(query)
    );
    const tbody = document.getElementById('admin-products-table');
    if (!tbody) return;

    console.log(`🖼️ [UI] Rendering ${products.length} Products (Filtered from ${allProducts.length})`);

    tbody.innerHTML = products.map(p => `
        <tr>
            <td><input type="checkbox" class="select-row-products" value="${p.id}" onchange="updateBulkActionBar('products')"></td>
            <td data-label="Preview"><img src="${p.image}" class="table-img" alt="${p.name}"></td>
            <td data-label="Product Name" style="font-weight:600;">${p.name}</td>
            <td data-label="Category">${p.category}</td>
            <td data-label="Price" style="font-weight:700;">₹ ${p.price.toLocaleString('en-IN')}</td>
            <td data-label="Actions">
                <div class="action-btns">
                    <div class="action-btn btn-edit" title="Edit" onclick="editProduct('${p.id}')"><i data-lucide="edit-3" size="16"></i></div>
                    <div class="action-btn btn-delete" title="Delete" onclick="deleteProduct('${p.id}')"><i data-lucide="trash-2" size="16"></i></div>
                </div>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="6" style="text-align:center; padding: 2rem; color: #888;">No products found.</td></tr>';

    if (window.lucide) lucide.createIcons();
}

function openProductModal(id = null) {
    const modal = document.getElementById('product-modal');
    const form = document.getElementById('product-form');
    const title = document.getElementById('prodModalTitle');

    form.reset();
    document.getElementById('edit-prod-id').value = id || '';

    if (id) {
        title.textContent = 'Edit Product';
        const p = KNSData.getProducts().find(x => x.id === id);
        if (p) {
            document.getElementById('prod-name').value = p.name || '';
            document.getElementById('prod-cat').value = p.category || 'Executive Chair';
            document.getElementById('prod-mat').value = p.material || 'Metal';
            document.getElementById('prod-price').value = p.price || '';
            document.getElementById('prod-mrp').value = p.mrp || '';
            document.getElementById('prod-desc').value = p.description || '';
            document.getElementById('prod-long-desc').value = p.longDescription || '';
            document.getElementById('prod-specs').value = p.specs ? JSON.stringify(p.specs, null, 2) : '';
            document.getElementById('prod-dimens').value = p.dimensions ? JSON.stringify(p.dimensions, null, 2) : '';
            document.getElementById('prod-colors').value = p.colors ? JSON.stringify(p.colors, null, 2) : '';

            document.getElementById('prod-isnew').checked = !!p.isNew;
            document.getElementById('prod-trending').checked = p.badge === 'Trending';

            // Multi-images
            document.getElementById('prod-img-1').value = p.image || (p.images ? p.images[0] : '');
            document.getElementById('prod-img-2').value = (p.images && p.images[1]) ? p.images[1] : '';
            document.getElementById('prod-img-3').value = (p.images && p.images[2]) ? p.images[2] : '';
            document.getElementById('prod-img-4').value = (p.images && p.images[3]) ? p.images[3] : '';
        }
    } else {
        title.textContent = 'Add New Product';
    }

    modal.classList.add('active');
}

function handleProductSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-prod-id').value;

    let specs = {}, dimens = {};
    try {
        const specsVal = document.getElementById('prod-specs').value.trim();
        if (specsVal) specs = JSON.parse(specsVal);
    } catch (e) { console.warn("Invalid specs JSON", e); }

    try {
        const dimensVal = document.getElementById('prod-dimens').value.trim();
        if (dimensVal) dimens = JSON.parse(dimensVal);
    } catch (e) { console.warn("Invalid dimensions JSON", e); }

    let colors = null;
    try {
        const colorsVal = document.getElementById('prod-colors').value.trim();
        if (colorsVal) colors = JSON.parse(colorsVal);
    } catch (e) { console.warn("Invalid colors JSON", e); }

    const data = {
        name: document.getElementById('prod-name').value,
        category: document.getElementById('prod-cat').value,
        material: document.getElementById('prod-mat').value,
        price: parseInt(document.getElementById('prod-price').value) || 0,
        mrp: parseInt(document.getElementById('prod-mrp').value) || 0,
        description: document.getElementById('prod-desc').value,
        longDescription: document.getElementById('prod-long-desc').value,
        specs: specs,
        dimensions: dimens,
        colors: colors,
        image: document.getElementById('prod-img-1').value,

        images: [
            document.getElementById('prod-img-1').value,
            document.getElementById('prod-img-2').value,
            document.getElementById('prod-img-3').value,
            document.getElementById('prod-img-4').value
        ].filter(v => v && v.trim() !== ''),
        isNew: document.getElementById('prod-isnew').checked,
        badge: document.getElementById('prod-trending').checked ? 'Trending' : '',
        rating: 4.5
    };

    if (id) {
        KNSData.updateProduct(id, data);
    } else {
        KNSData.addProduct(data);
    }

    closeModal('product-modal');
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product? This cannot be undone.')) {
        KNSData.deleteProduct(id);
    }
}

/* --- Catalogs CRUD --- */
function renderCatalogsTable() {
    const catalogs = KNSData.getCatalogs();
    const tbody = document.getElementById('admin-catalogs-table');

    tbody.innerHTML = catalogs.map(c => `
        <tr>
            <td data-label="Preview"><img src="${c.image}" class="table-img"></td>
            <td data-label="Catalog Name" style="font-weight:600;">${c.name}</td>
            <td data-label="Badge"><span class="status-badge confirmed">${c.category}</span></td>
            <td data-label="Description" style="color:#888; font-size:0.9rem;">${c.description.slice(0, 40)}...</td>
            <td data-label="Actions">
                <div class="action-btns">
                    <div class="action-btn btn-edit" title="Edit" onclick="editCatalog('${c.id}')"><i data-lucide="edit-3" size="16"></i></div>
                    <div class="action-btn btn-delete" title="Delete" onclick="deleteCatalog('${c.id}')"><i data-lucide="trash-2" size="16"></i></div>
                </div>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="5" style="text-align:center; padding: 2rem; color: #888;">No catalogs found.</td></tr>';

    if (window.lucide) lucide.createIcons();
}

function openCatalogModal(id = null) {
    const modal = document.getElementById('catalog-modal');
    const form = document.getElementById('catalog-form');
    const title = document.getElementById('catModalTitle');

    form.reset();
    document.getElementById('edit-cat-id').value = id || '';

    if (id) {
        title.textContent = 'Edit Catalog';
        const c = KNSData.getCatalogs().find(x => x.id === id);
        if (c) {
            document.getElementById('cat-name').value = c.name;
            document.getElementById('cat-badge').value = c.category;
            document.getElementById('cat-desc').value = c.description;
            document.getElementById('cat-img').value = c.image;
        }
    } else {
        title.textContent = 'Add New Catalog';
    }

    modal.classList.add('active');
}

function handleCatalogSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-cat-id').value;
    const data = {
        name: document.getElementById('cat-name').value,
        category: document.getElementById('cat-badge').value,
        description: document.getElementById('cat-desc').value,
        image: document.getElementById('cat-img').value,
        pdf: '#'
    };

    if (id) {
        KNSData.updateCatalog(id, data);
    } else {
        KNSData.addCatalog(data);
    }

    closeModal('catalog-modal');
}

function deleteCatalog(id) {
    if (confirm('Delete this catalog?')) KNSData.deleteCatalog(id);
}

/* --- Orders & Users --- */
function renderOrdersTable() {
    const query = document.getElementById('order-search').value.toLowerCase();
    const orders = getAllOrders().filter(o =>
        o.id.toLowerCase().includes(query) || o.total.toString().includes(query)
    );
    const tbody = document.getElementById('admin-orders-table');
    if (!tbody) return;

    tbody.innerHTML = orders.map(o => {
        const rawId = (o.id || o.orderNumber || o.firestoreId || '').replace('#ORD-', '').replace('#KNS-', '');
        const ordId = rawId.length > 8 ? rawId.slice(-8) : rawId;
        const fId = o.firestoreId || o.id; 
        const oDate = o.timestamp || o.date || Date.now();
        const oUser = o.userName || o.customerName || 'Customer';
        const oTotal = o.total || 0;
        const oStatus = o.status || 'Confirmed';

        return `
            <tr>
                <td data-label="Order Number" style="font-weight:600;">#ORD-${ordId}</td>
                <td data-label="Date">${new Date(oDate).toLocaleDateString()}</td>
                <td data-label="Total Amount" style="font-weight:700;">₹ ${oTotal.toLocaleString('en-IN')}</td>
                <td data-label="Items">${o.items ? o.items.length : 0} Product(s)</td>
                <td data-label="Status"><span class="status-badge ${oStatus.toLowerCase()}">${oStatus}</span></td>
                <td data-label="Actions">
                    <div class="action-btns">
                        <div class="action-btn btn-view" title="View Details" onclick="viewOrder('${fId}')" style="background:#8CC63F; color:white;"><i data-lucide="eye" size="16"></i></div>
                    </div>
                </td>
            </tr>
        `;
    }).join('') || '<tr><td colspan="6" style="text-align:center; padding: 2rem; color: #888;">No orders found.</td></tr>';

    if (window.lucide) lucide.createIcons();
}

function renderUsersTable() {
    const searchInput = document.getElementById('user-search');
    const query = (searchInput ? searchInput.value : '').toLowerCase();

    // Direct Access to Memory-Backed KNSData
    let storedUsers = [];
    if (window.KNSData && KNSData.getUsers) {
        storedUsers = KNSData.getUsers();
    } else {
        storedUsers = JSON.parse(localStorage.getItem('kns_users')) || [];
    }

    // Fallback: If no users but we are logged in, show current admin
    if (storedUsers.length === 0 && window.KNSAuth) {
        const u = KNSAuth.getUser();
        if (u) storedUsers.push({ ...u, createdAt: Date.now(), name: (u.name || 'Admin') + ' (You)' });
    }

    const users = storedUsers.filter(u =>
        (u.name || '').toLowerCase().includes(query) || (u.email && u.email.toLowerCase().includes(query))
    );
    const tbody = document.getElementById('admin-users-table');
    if (!tbody) return;

    console.log(`👥 [UI] Rendering ${users.length} Users (Total in Memory: ${storedUsers.length})`);

    tbody.innerHTML = users.map(u => {
        const uName = u.name || 'Anonymous';
        const uEmail = u.email || 'No email';
        const uDate = u.createdAt || u.lastLogin || Date.now();
        return `
            <tr>
                <td data-label="Avatar"><div class="admin-avatar" style="width:32px; height:32px; font-size:0.8rem;">${(uName[0] || '?').toUpperCase()}</div></td>
                <td data-label="Name" style="font-weight:600;">${uName}</td>
                <td data-label="Email">${uEmail}</td>
                <td data-label="Joined On">${uDate ? new Date(uDate).toLocaleDateString() : 'Active Session'}</td>
            </tr>
        `;
    }).join('') || '<tr><td colspan="4" style="text-align:center; padding: 2.5rem; color: #888;">No customers registered yet. Click "Sync Cloud" above to refresh.</td></tr>';
}

function renderReviewsTable() {
    const query = document.getElementById('review-search').value.toLowerCase();
    const reviews = KNSData.getReviews().filter(r =>
        r.userName.toLowerCase().includes(query) || r.comment.toLowerCase().includes(query)
    );
    const tbody = document.getElementById('admin-reviews-table');
    const products = KNSData.getProducts();

    tbody.innerHTML = reviews.map(r => {
        const p = products.find(x => x.id === r.productId) || { name: 'Unknown Product' };
        const uName = r.userName || 'Customer';
        const rDate = r.timestamp || r.date || Date.now();
        return `
            <tr>
                <td data-label="Product" style="font-weight:600;">${p.name}</td>
                <td data-label="Author">${uName}</td>
                <td data-label="Rating">${"★".repeat(r.rating || 0)}${"☆".repeat(5 - (r.rating || 0))}</td>
                <td data-label="Comment" style="font-size:0.9rem; color:#666; max-width:300px;">${r.comment || 'No comment provided.'}</td>
                <td data-label="Date">${new Date(rDate).toLocaleDateString()}</td>
                <td data-label="Actions">
                    <div class="action-btns">
                        <div class="action-btn btn-delete" title="Delete Review" onclick="deleteReview('${r.id}')"><i data-lucide="trash-2" size="16"></i></div>
                    </div>
                </td>
            </tr>
        `;
    }).join('') || '<tr><td colspan="6" style="text-align:center; padding: 2rem; color: #888;">No reviews found.</td></tr>';

    if (window.lucide) lucide.createIcons();
}

function deleteReview(id) {
    if (confirm('Are you sure you want to delete this review?')) {
        KNSData.deleteReview(id);
    }
}

function renderInquiriesTable() {
    const tbody = document.getElementById('inquiriesTableBody');
    if (!tbody) return;

    let inquiries = [];
    if (window.KNSData && KNSData.getInquiries) {
        inquiries = KNSData.getInquiries();
    }

    tbody.innerHTML = inquiries.map(iq => {
        const id = iq.id || iq.firestoreId;
        const date = iq.timestamp || iq.createdAt || Date.now();
        const displayDate = new Date(date).toLocaleString();

        // Concatenate Full Name from firstName + lastName, or fallback to name
        const fn = iq.firstName || iq.firstname || '';
        const ln = iq.lastName || iq.lastname || '';
        const fullName = (fn + ' ' + ln).trim() || iq.name || 'Anonymous';

        return `
            <tr>
                <td data-label="Date">${displayDate}</td>
                <td data-label="Customer" style="font-weight:600;">${fullName}</td>
                <td data-label="Contact">
                    <div style="font-size:0.85rem; color:#1A1A1A;">${iq.email || 'No Email'}</div>
                    <div style="font-size:0.8rem; color:#888;">${iq.phone || 'No Phone'}</div>
                </td>
                <td data-label="Message">
                    <div style="max-width:300px; font-size:0.9rem; line-height:1.4; color:#444;">${iq.message || 'No Message'}</div>
                </td>
                <td data-label="Actions">
                    <div class="action-btns">
                        <button class="action-btn" onclick="handleDeleteInquiry('${id}')" title="Delete" style="background:#ff4d4d; color:white; border:none; border-radius:6px; width:32px; height:32px; cursor:pointer;">
                            <i data-lucide="trash-2" size="16"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('') || '<tr><td colspan="5" style="text-align:center; padding:3rem; color:#888;">No inquiries found in the cloud.</td></tr>';

    if (window.lucide) lucide.createIcons();
}

async function handleDeleteInquiry(id) {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    if (window.KNSData && KNSData.deleteInquiry) {
        const res = await KNSData.deleteInquiry(id);
        if (res.ok) {
            if (window.KNSCart && KNSCart.showToast) KNSCart.showToast('Inquiry deleted from cloud.');
            renderInquiriesTable();
        } else {
            alert('Failed to delete: ' + (res.msg || 'Unknown error'));
        }
    }
}

/* --- Blogs Management --- */
function renderBlogsTable() {
    const query = (document.getElementById('blog-search')?.value || '').toLowerCase();
    const blogs = KNSData.getBlogs().filter(b => 
        (b.title || '').toLowerCase().includes(query) || (b.author || '').toLowerCase().includes(query)
    );
    const tbody = document.getElementById('admin-blogs-table');
    if (!tbody) return;

    tbody.innerHTML = blogs.map(b => {
        const id = b.firestoreId || b.id;
        const date = b.date ? (b.date.seconds ? new Date(b.date.seconds * 1000) : new Date(b.date)) : new Date();
        return `
            <tr>
                <td data-label="Preview"><img src="${b.image || 'https://via.placeholder.com/50'}" class="table-img" alt="Blog"></td>
                <td data-label="Title" style="font-weight:600;">${b.title || 'Untitled'}</td>
                <td data-label="Author">${b.author || 'KNS Editorial'}</td>
                <td data-label="Date">${date.toLocaleDateString()}</td>
                <td data-label="Actions">
                    <div class="action-btns">
                        <div class="action-btn btn-edit" title="Edit Blog" onclick="openBlogModal('${id}')"><i data-lucide="edit"></i></div>
                        <div class="action-btn btn-delete" title="Delete Blog" onclick="deleteBlog('${id}')"><i data-lucide="trash-2"></i></div>
                    </div>
                </td>
            </tr>
        `;
    }).join('') || '<tr><td colspan="5" style="text-align:center; padding: 2rem; color: #888;">No blog posts found.</td></tr>';

    if (window.lucide) lucide.createIcons();
}

function openBlogModal(blogId = null) {
    const modal = document.getElementById('blog-modal');
    const form = document.getElementById('blog-form');
    const titleElem = document.getElementById('blogModalTitle');
    
    form.reset();
    document.getElementById('edit-blog-id').value = '';
    titleElem.textContent = 'Create Blog Post';

    if (blogId) {
        const b = KNSData.getBlogs().find(x => (x.firestoreId || x.id) === blogId);
        if (b) {
            document.getElementById('edit-blog-id').value = blogId;
            document.getElementById('blog-title').value = b.title || '';
            document.getElementById('blog-author').value = b.author || 'KNS Editorial';
            document.getElementById('blog-category').value = b.category || 'Ergonomics & Health';
            document.getElementById('blog-image').value = b.image || '';
            document.getElementById('blog-excerpt').value = b.excerpt || '';
            document.getElementById('blog-content').value = b.content || '';
            titleElem.textContent = 'Edit Blog Post';
        }
    }

    modal.classList.add('active');
}

async function handleBlogSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-blog-id').value;
    const blogData = {
        title: document.getElementById('blog-title').value,
        author: document.getElementById('blog-author').value,
        category: document.getElementById('blog-category').value,
        image: document.getElementById('blog-image').value,
        excerpt: document.getElementById('blog-excerpt').value,
        content: document.getElementById('blog-content').value
    };

    let res;
    if (id) {
        res = await KNSData.updateBlog(id, blogData);
    } else {
        res = await KNSData.addBlog(blogData);
    }

    if (res && res.ok !== false) {
        if (window.KNSCart) KNSCart.showToast(id ? 'Blog updated!' : 'Blog published!');
        closeModal('blog-modal');
        renderBlogsTable();
    } else {
        alert("Error saving blog: " + (res?.msg || "Unknown error"));
    }
}

/* --- Promotions Management --- */
function renderCouponsTable() {
    const query = (document.getElementById('coupon-search')?.value || '').toLowerCase();
    const coupons = KNSData.getCoupons().filter(c => (c.code || '').toLowerCase().includes(query));
    const tbody = document.getElementById('admin-coupons-table');
    if (!tbody) return;

    tbody.innerHTML = coupons.map(c => {
        const isExpired = new Date(c.expiry) < new Date();
        const statusClass = isExpired ? 'deleted' : 'confirmed';
        const usagePct = Math.round((c.usedCount / c.usageLimit) * 100);

        return `
            <tr>
                <td><input type="checkbox" class="select-row-coupons" value="${c.id}" onchange="updateBulkActionBar('coupons')"></td>
                <td data-label="Code" style="font-weight:700; color:var(--admin-green);">${c.code}</td>
                <td data-label="Discount">${c.type === 'percentage' ? c.value + '%' : '₹' + c.value}</td>
                <td data-label="Min Order">₹ ${(c.minOrder || 0).toLocaleString()}</td>
                <td data-label="Expiry">${new Date(c.expiry).toLocaleDateString()}</td>
                <td data-label="Usage">
                    <div style="font-size:0.8rem; margin-bottom:4px;">${c.usedCount} / ${c.usageLimit}</div>
                    <div style="width:100%; height:4px; background:#eee; border-radius:10px;">
                        <div style="width:${usagePct}%; height:100%; background:var(--admin-green); border-radius:10px;"></div>
                    </div>
                </td>
                <td data-label="Status"><span class="status-badge ${statusClass}">${isExpired ? 'Expired' : 'Active'}</span></td>
                <td data-label="Actions">
                    <div class="action-btns">
                        <div class="action-btn btn-edit" title="Edit" onclick="openCouponModal('${c.id}')"><i data-lucide="edit-3" size="16"></i></div>
                        <div class="action-btn btn-delete" title="Delete" onclick="deleteCoupon('${c.id}')"><i data-lucide="trash-2" size="16"></i></div>
                    </div>
                </td>
            </tr>
        `;
    }).join('') || '<tr><td colspan="8" style="text-align:center; padding: 2rem; color: #888;">No coupons found.</td></tr>';

    if (window.lucide) lucide.createIcons();
}

function openCouponModal(id = null) {
    const modal = document.getElementById('coupon-modal');
    const form = document.getElementById('coupon-form');
    const title = document.getElementById('cpModalTitle');

    form.reset();
    document.getElementById('edit-cp-id').value = id || '';

    if (id) {
        title.textContent = 'Edit Coupon';
        const c = KNSData.getCoupons().find(x => x.id === id);
        if (c) {
            document.getElementById('cp-code').value = c.code;
            document.getElementById('cp-type').value = c.type;
            document.getElementById('cp-value').value = c.value;
            document.getElementById('cp-min').value = c.minOrder;
            document.getElementById('cp-expiry').value = c.expiry;
            document.getElementById('cp-limit').value = c.usageLimit;
        }
    } else {
        title.textContent = 'Add New Coupon';
        // Set default expiry to 30 days from now
        const d = new Date();
        d.setDate(d.getDate() + 30);
        document.getElementById('cp-expiry').value = d.toISOString().split('T')[0];
    }

    modal.classList.add('active');
}

async function handleCouponSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-cp-id').value;
    const data = {
        code: document.getElementById('cp-code').value.toUpperCase(),
        type: document.getElementById('cp-type').value,
        value: parseInt(document.getElementById('cp-value').value) || 0,
        minOrder: parseInt(document.getElementById('cp-min').value) || 0,
        expiry: document.getElementById('cp-expiry').value,
        usageLimit: parseInt(document.getElementById('cp-limit').value) || 0
    };

    if (id) {
        await KNSData.updateCoupon(id, data);
    } else {
        await KNSData.addCoupon(data);
    }

    closeModal('coupon-modal');
}

function deleteCoupon(id) {
    if (confirm('Delete this coupon? This will prevent customers from using it.')) {
        KNSData.deleteCoupon(id);
    }
}

async function deleteBlog(id) {
    if (confirm('Delete this blog post permanently?')) {
        const res = await KNSData.deleteBlog(id);
        if (res && res.ok !== false) {
            if (window.KNSCart) KNSCart.showToast('Blog deleted.');
            renderBlogsTable();
        }
    }
}

window.handleDeleteInquiry = handleDeleteInquiry;

/* --- Utils --- */
function getAllOrders() {
    if (window.KNSData && KNSData.getAllOrders) return KNSData.getAllOrders();
    const all = JSON.parse(localStorage.getItem('kns_orders_all')) || [];
    return all.sort((a, b) => new Date(b.timestamp || b.date || 0) - new Date(a.timestamp || a.date || 0));
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}


function logoutAdmin() {
    KNSAuth.logout();
    window.location.href = 'signin.html';
}

// Expose globals for onclick
window.editProduct = openProductModal;
window.deleteProduct = deleteProduct;
window.editCatalog = openCatalogModal;
window.deleteCatalog = deleteCatalog;
window.deleteReview = deleteReview;
window.renderReviewsTable = renderReviewsTable;
window.logoutAdmin = logoutAdmin;
window.closeModal = closeModal;
window.openBlogModal = openBlogModal;
window.handleBlogSubmit = handleBlogSubmit;
window.deleteBlog = deleteBlog;
window.renderBlogsTable = renderBlogsTable;
window.openCouponModal = openCouponModal;
window.deleteCoupon = deleteCoupon;
window.renderCouponsTable = renderCouponsTable;
/** Bulk Actions & CSV Import System **/
let importType = null;
let importedData = [];

function toggleSelectAll(type) {
    const isChecked = document.getElementById(`select-all-${type}`).checked;
    document.querySelectorAll(`.select-row-${type}`).forEach(cb => cb.checked = isChecked);
    updateBulkActionBar(type);
}

function updateBulkActionBar(type) {
    const selected = document.querySelectorAll(`.select-row-${type}:checked`);
    const btn = document.getElementById(`btn-bulk-delete-${type}`);
    const countSpan = document.getElementById(`count-${type}`);
    
    if (btn) {
        if (selected.length > 0) {
            btn.style.display = 'flex';
            countSpan.textContent = selected.length;
        } else {
            btn.style.display = 'none';
        }
    }
}

async function handleBulkDelete(type) {
    const selected = Array.from(document.querySelectorAll(`.select-row-${type}:checked`)).map(cb => cb.value);
    if (!selected.length) return;

    if (confirm(`Are you sure you want to delete ${selected.length} ${type}? This action cannot be reversed.`)) {
        try {
            const btn = document.getElementById(`btn-bulk-delete-${type}`);
            btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Deleting...';
            btn.disabled = true;

            for (const id of selected) {
                if (type === 'products') await KNSData.deleteProduct(id);
                else if (type === 'coupons') await KNSData.deleteCoupon(id);
            }

            if (window.KNSCart) KNSCart.showToast(`Batch delete successful: ${selected.length} items removed.`);
            
            // Re-render table and reset head checkbox
            const masterCb = document.getElementById(`select-all-${type}`);
            if (masterCb) masterCb.checked = false;
            
            if (type === 'products') renderProductsTable();
            else renderCouponsTable();

        } catch (e) {
            console.error("Bulk Delete Error:", e);
            alert("Error during bulk delete: " + e.message);
        }
    }
}

function openImportModal(type) {
    importType = type;
    const modal = document.getElementById('import-modal');
    const title = document.getElementById('importModalTitle');
    const instructions = document.getElementById('importInstructions');
    const preview = document.getElementById('import-preview');
    const templateLink = document.getElementById('template-link');
    
    title.textContent = `Import ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    instructions.innerHTML = type === 'products' 
        ? "Upload a CSV file to add multiple items at once.<br><a id='template-link' href='products_template.csv' download style='color:var(--admin-green); font-weight:600; text-decoration:none; margin-top:8px; display:inline-block;'><i data-lucide='download' size='14'></i> Download Product Template</a>"
        : "Upload a CSV file to add multiple items at once.<br><a id='template-link' href='coupons_template.csv' download style='color:var(--admin-green); font-weight:600; text-decoration:none; margin-top:8px; display:inline-block;'><i data-lucide='download' size='14'></i> Download Coupon Template</a>";
    
    preview.style.display = 'none';
    importedData = [];
    modal.classList.add('active');
    if (window.lucide) lucide.createIcons();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        importedData = parseCSV(text);
        showImportPreview();
    };
    reader.readAsText(file);
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''));
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); // Better regex for commas inside quotes
        const obj = {};
        headers.forEach((h, index) => {
            let val = (currentline[index] || '').trim().replace(/"/g, '');
            obj[h] = val;
        });
        rows.push(obj);
    }
    return rows;
}

function showImportPreview() {
    const preview = document.getElementById('import-preview');
    const countSpan = document.getElementById('preview-count');
    const table = document.getElementById('preview-table');
    
    countSpan.textContent = importedData.length;
    
    if (importedData.length > 0) {
        const headers = Object.keys(importedData[0]);
        table.innerHTML = `
            <thead>
                <tr>${headers.map(h => `<th style="text-align:left; border-bottom:1px solid #ddd; padding:5px;">${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
                ${importedData.slice(0, 5).map(row => `
                    <tr>${headers.map(h => `<td style="padding:5px; border-bottom:1px solid #eee;">${row[h]}</td>`).join('')}</tr>
                `).join('')}
                ${importedData.length > 5 ? `<tr><td colspan="${headers.length}" style="text-align:center; padding-top:10px; color:#999;">...and ${importedData.length - 5} more rows</td></tr>` : ''}
            </tbody>
        `;
        preview.style.display = 'block';
    }
}

async function processImport() {
    if (!importedData.length) return;
    
    const btn = document.querySelector('#import-preview .btn-add');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> Importing...';
    btn.disabled = true;

    let successCount = 0;
    try {
        for (const row of importedData) {
            if (importType === 'products') {
                if (!row.name || !row.category) continue;
                
                // Helper to parse JSON fields safely
                const parseJSON = (str, fallback) => {
                    try { return str ? JSON.parse(str.replace(/""/g, '"')) : fallback; } 
                    catch(e) { console.warn("JSON Parse Error for field:", str); return fallback; }
                };

                await KNSData.addProduct({
                    name: row.name,
                    category: row.category,
                    price: parseInt(row.price) || 0,
                    mrp: parseInt(row.mrp) || 0,
                    description: row.description || '',
                    longDescription: row.longDescription || row.long_description || '',
                    image: row.image_url || row.image || 'https://via.placeholder.com/300',
                    images: row.gallery_images ? row.gallery_images.split(',').map(s => s.trim()) : [],
                    material: row.material || 'Standard',
                    badge: row.badge || '',
                    specs: parseJSON(row.specs, {}),
                    dimensions: parseJSON(row.dimensions, {}),
                    colors: parseJSON(row.colors, []),
                    rating: 5,
                    isNew: row.is_new === 'true' || row.is_new === true
                });
            } else if (importType === 'coupons') {
                if (!row.code || !row.value) continue;
                await KNSData.addCoupon({
                    code: row.code.toUpperCase(),
                    type: row.type || 'percentage',
                    value: parseInt(row.value) || 0,
                    minOrder: parseInt(row.min_order) || parseInt(row.minOrder) || 0,
                    expiry: row.expiry || new Date().toISOString().split('T')[0],
                    usageLimit: parseInt(row.usage_limit) || parseInt(row.usageLimit) || 100
                });
            }
            successCount++;
        }

        if (window.KNSCart) KNSCart.showToast(`Import completed: ${successCount} items added successfully.`);
        closeModal('import-modal');
        
        if (importType === 'products') renderProductsTable();
        else renderCouponsTable();

    } catch (e) {
        console.error("Import Error:", e);
        alert("An error occurred during import: " + e.message);
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

window.toggleSelectAll = toggleSelectAll;
window.updateBulkActionBar = updateBulkActionBar;
window.handleBulkDelete = handleBulkDelete;
window.openImportModal = openImportModal;
window.handleFileSelect = handleFileSelect;
window.processImport = processImport;
window.viewOrder = (id) => {
    // Optional: Pre-cache for instant load
    const orders = window.KNSData && KNSData.getAllOrders ? KNSData.getAllOrders() : [];
    const ord = orders.find(x => x.firestoreId === id || x.id === id);
    if (ord) localStorage.setItem('kns_view_order_temp', JSON.stringify(ord));

    window.location.href = `order-details.html?id=${id}`;
};
