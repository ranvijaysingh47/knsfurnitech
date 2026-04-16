/* ================================================================
   cart.js — KNS Furnitech | Per-User Cart Engine
   Uses localStorage keyed by user email when logged in.
   Dispatches 'cart:updated' on every change.
   ================================================================ */

const KNSCart = (() => {
    function _key() {
        try {
            const u = JSON.parse(localStorage.getItem('kns_user'));
            return u && u.email ? `kns_cart_${u.email}` : 'kns_cart_guest';
        } catch { return 'kns_cart_guest'; }
    }

    function load() {
        try { return JSON.parse(localStorage.getItem(_key())) || []; }
        catch { return []; }
    }
    function save(items) {
        localStorage.setItem(_key(), JSON.stringify(items));
        
        // Sync to Firestore if logged in
        const user = JSON.parse(localStorage.getItem('kns_user'));
        if (user && user.uid && window.KNSDb) {
            KNSDb.saveUserData(user.uid, 'cart', items);
        }

        document.dispatchEvent(new CustomEvent('cart:updated', { detail: { items } }));
    }

    async function syncFromCloud() {
        const user = JSON.parse(localStorage.getItem('kns_user'));
        if (user && user.uid && window.KNSDb) {
            const cloudCart = await KNSDb.getUserData(user.uid, 'cart');
            if (cloudCart) {
                localStorage.setItem(_key(), JSON.stringify(cloudCart));
                document.dispatchEvent(new CustomEvent('cart:updated', { detail: { items: cloudCart } }));
                console.log("Cart synced from cloud.");
            }
        }
    }

    /* ── Order History ── */
    function _orderKey() {
        try {
            const u = JSON.parse(localStorage.getItem('kns_user'));
            return u && u.email ? `kns_orders_${u.email}` : 'kns_orders_guest';
        } catch { return 'kns_orders_guest'; }
    }
    function saveOrder(order) {
        try {
            const history = JSON.parse(localStorage.getItem(_orderKey())) || [];
            history.unshift(order); // Newest first
            localStorage.setItem(_orderKey(), JSON.stringify(history));
        } catch(e) { console.error("Failed to save order", e); }
    }
    function getOrders() {
        try { return JSON.parse(localStorage.getItem(_orderKey())) || []; }
        catch { return []; }
    }

    function getCart()  { return load(); }
    function getCount() { return load().reduce((s, i) => s + i.qty, 0); }
    function getTotal() { return load().reduce((s, i) => s + i.price * i.qty, 0); }

    function addToCart(product) {
        if (typeof KNSAuth !== 'undefined' && !KNSAuth.isLoggedIn()) {
            showToast("Please sign in to add items to your cart.");
            setTimeout(() => { window.location.href = 'signin.html'; }, 1000);
            return;
        }
        const items = load();
        const existing = items.find(i => i.id === product.id);
        
        // Stock Validation (Always check latest data if available)
        let currentStock = product.stock;
        if (window.KNSData && KNSData.getProducts) {
            const latest = KNSData.getProducts().find(p => p.id === product.id);
            if (latest && latest.stock !== undefined) {
                currentStock = latest.stock;
            }
        }

        if (currentStock !== undefined && currentStock !== null && currentStock <= 0) {
            showToast(`Sorry, "${product.name}" is currently out of stock.`);
            return;
        }

        if (existing) {
            const newQty = existing.qty + (product.qty || 1);
            if (currentStock !== undefined && currentStock !== null && newQty > currentStock) {
                showToast(`Sorry, only ${currentStock} units of "${product.name}" are available.`);
                existing.qty = currentStock;
            } else {
                existing.qty = newQty;
            }
        } else {
            items.push({ ...product, qty: product.qty || 1, stock: currentStock });
        }
        save(items);
        showToast(`"${product.name}" added to cart!`, true);
    }

    function removeFromCart(id) { 
        save(load().filter(i => i.id !== id)); 
    }

    function updateQty(id, qty) {
        const items = load();
        const item = items.find(i => i.id === id);
        if (!item) return;
        if (qty <= 0) { removeFromCart(id); return; }
        item.qty = qty;
        save(items);
    }

    function clearCart() { save([]); }

    /* ── Toast notification ── */
    function showToast(msg, showCartLink = false) {
        let toast = document.getElementById('kns-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'kns-toast';
            document.body.appendChild(toast);
        }
        
        let html = `<span>${msg}</span>`;
        if (showCartLink) {
            html += ` <a href="cart.html" style="color: #8CC63F; text-decoration: underline; margin-left: 10px; font-weight: 700;">View Cart</a>`;
        }
        
        toast.innerHTML = html;
        toast.classList.add('kns-toast-show');
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => toast.classList.remove('kns-toast-show'), 4000);
    }

    return { getCart, getCount, getTotal, addToCart, removeFromCart, updateQty, clearCart, showToast, saveOrder, getOrders, syncFromCloud };
})();

/**
 * Global Bridge for simple onclick handlers (used in Bestsellers and other quick actions)
 */
window.addToCart = (name, price, image) => {
    KNSCart.addToCart({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name: name,
        price: parseInt(price),
        image: image,
        category: 'Bestseller'
    });
};

/* ── Live badge updates on cart:updated ── */
document.addEventListener('cart:updated', () => {
    const count = KNSCart.getCount();
    document.querySelectorAll('.kns-cart-badge').forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
    renderCartDrawer();
});

/* ── Re-sync when user logs in/out ── */
document.addEventListener('auth:changed', () => {
    const count = KNSCart.getCount();
    document.querySelectorAll('.kns-cart-badge').forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
    renderCartDrawer();
});

/* ── Initialise badge on page load ── */
document.addEventListener('DOMContentLoaded', () => {
    const count = KNSCart.getCount();
    document.querySelectorAll('.kns-cart-badge').forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });

    /* Cart drawer toggle */
    _ensureDrawerHTML();
    document.querySelectorAll('[data-open-cart]').forEach(btn => {
        btn.addEventListener('click', toggleCartDrawer);
    });
    document.getElementById('kns-drawer-overlay')?.addEventListener('click', closeCartDrawer);
    document.getElementById('kns-drawer-close')?.addEventListener('click', closeCartDrawer);

    renderCartDrawer();
});

/* ── Dynamic Injection ── */
function _ensureDrawerHTML() {
    if (document.getElementById('kns-cart-drawer')) return;
    console.log("🛒 Cart: Injecting Universal Drawer");
    const html = `
        <div id="kns-drawer-overlay"></div>
        <aside id="kns-cart-drawer">
            <div class="kns-drawer-head">
                <h3>🛒 Your Cart</h3>
                <button id="kns-drawer-close" aria-label="Close cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>
            <div id="kns-drawer-items"></div>
            <div class="kns-drawer-foot">
                <div class="kns-drawer-subtotal-row">
                    <span>Subtotal</span>
                    <span id="kns-drawer-subtotal">₹0</span>
                </div>
                <div class="kns-drawer-actions">
                    <a href="cart.html" class="kns-ec-btn kns-ec-btn-outline">View Cart</a>
                    <a href="cart.html" class="kns-ec-btn kns-ec-btn-primary">Checkout →</a>
                </div>
            </div>
        </aside>`;
    document.body.insertAdjacentHTML('beforeend', html);
}

/* ── Cart Drawer ── */
function toggleCartDrawer() {
    const drawer = document.getElementById('kns-cart-drawer');
    if (!drawer) return;
    drawer.classList.contains('is-open') ? closeCartDrawer() : openCartDrawer();
}
function openCartDrawer() {
    document.getElementById('kns-cart-drawer')?.classList.add('is-open');
    document.getElementById('kns-drawer-overlay')?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}
function closeCartDrawer() {
    document.getElementById('kns-cart-drawer')?.classList.remove('is-open');
    document.getElementById('kns-drawer-overlay')?.classList.remove('is-open');
    document.body.style.overflow = '';
}

function renderCartDrawer() {
    const list = document.getElementById('kns-drawer-items');
    const subtotalEl = document.getElementById('kns-drawer-subtotal');
    if (!list) return;

    const items = KNSCart.getCart();
    if (!items.length) {
        list.innerHTML = `
          <div class="kns-drawer-empty">
            <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" fill="none" stroke="#ccc" stroke-width="1.5" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <p>Your cart is empty</p>
            <a href="shop.html" class="kns-ec-btn-sm" onclick="closeCartDrawer()">Browse Products</a>
          </div>`;
        if (subtotalEl) subtotalEl.textContent = '₹0';
        return;
    }

    list.innerHTML = items.map(item => `
      <div class="kns-drawer-item" data-id="${item.id}">
        <a href="product.html?id=${item.id}" class="kns-di-img-link" onclick="closeCartDrawer()">
          <div class="kns-di-img" style="background-image:url('${item.image}')"></div>
        </a>
        <div class="kns-di-info">
          <span class="kns-di-cat">${item.category}</span>
          <a href="product.html?id=${item.id}" class="kns-di-name-link" onclick="closeCartDrawer()">
            <span class="kns-di-name">${item.name}</span>
          </a>

          ${(item.stock <= 0 && item.stock !== null && item.stock !== undefined) ? 
            `<span style="color:#e53e3e; font-size:0.7rem; font-weight:700;">⚠️ OUT OF STOCK</span>` : 
            `<span class="kns-di-price">₹${item.price.toLocaleString('en-IN')}</span>`
          }
          <div class="kns-qty-ctrl">
            <button class="kns-qty-btn" onclick="KNSCart.updateQty('${item.id}', ${item.qty - 1})">−</button>
            <span>${item.qty}</span>
            <button class="kns-qty-btn" onclick="KNSCart.updateQty('${item.id}', ${item.qty + 1})">+</button>
            <button class="kns-di-remove" onclick="KNSCart.removeFromCart('${item.id}')" title="Remove">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            </button>
          </div>
        </div>
      </div>`).join('');

    if (subtotalEl) subtotalEl.textContent = '₹' + KNSCart.getTotal().toLocaleString('en-IN');
}
