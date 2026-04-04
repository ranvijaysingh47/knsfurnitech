/* ================================================================
   wishlist.js — KNS Furnitech | Per-User Wishlist Engine
   Uses localStorage keyed by user email when logged in.
   ================================================================ */

const KNSWishlist = (() => {
    function _key() {
        try {
            const u = JSON.parse(localStorage.getItem('kns_user'));
            return u && u.email ? `kns_wishlist_${u.email}` : 'kns_wishlist_guest';
        } catch { return 'kns_wishlist_guest'; }
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
            KNSDb.saveUserData(user.uid, 'wishlist', items);
        }

        document.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { items } }));
    }

    async function syncFromCloud() {
        const user = JSON.parse(localStorage.getItem('kns_user'));
        if (user && user.uid && window.KNSDb) {
            const cloudWishlist = await KNSDb.getUserData(user.uid, 'wishlist');
            if (cloudWishlist) {
                localStorage.setItem(_key(), JSON.stringify(cloudWishlist));
                document.dispatchEvent(new CustomEvent('wishlist:updated', { detail: { items: cloudWishlist } }));
                console.log("Wishlist synced from cloud.");
            }
        }
    }
    function getList()  { return load(); }
    function getCount() { return load().length; }
    function isWishlisted(id) { return load().some(i => i.id === id); }

    function toggle(product) {
        const items = load();
        const idx = items.findIndex(i => i.id === product.id);
        if (idx > -1) {
            items.splice(idx, 1);
            KNSCart.showToast(`Removed from Wishlist`);
        } else {
            items.push(product);
            KNSCart.showToast(`❤ Added to Wishlist!`);
        }
        save(items);
        return idx === -1;
    }
    function remove(id) { save(load().filter(i => i.id !== id)); }
    function clear()    { save([]); }
    return { getList, getCount, isWishlisted, toggle, remove, clear, syncFromCloud };
})();

/* Live badge + heart updates */
document.addEventListener('wishlist:updated', _syncWishlistUI);
document.addEventListener('auth:changed', _syncWishlistUI); // Re-sync on login/logout

function _syncWishlistUI() {
    const count = KNSWishlist.getCount();
    document.querySelectorAll('.kns-wish-badge').forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
        btn.classList.toggle('is-wished', KNSWishlist.isWishlisted(btn.dataset.wishlistId));
    });
}

document.addEventListener('DOMContentLoaded', _syncWishlistUI);
