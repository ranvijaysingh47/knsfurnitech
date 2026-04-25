// --- Support Widgets Integration ---
(function () {
    // Tawk.to Script
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = 'https://embed.tawk.to/69e0ee5b4b03f31c3c2e7d01/1jmba65ul';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    const x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s1, x);
})();

// Global XSS Mitigation Helper
window.escapeHTML = function(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
};

// --- Skeleton Loader Engine ---
window.KNSSkeleton = {
    getProductSkeleton: (count = 4) => {
        let html = '<div class="kns-skeleton-container">';
        for(let i=0; i<count; i++) {
            html += `
                <div class="product-card-skeleton">
                    <div class="skel-img kns-skeleton"></div>
                    <div class="skel-info">
                        <div class="skel-line-sm kns-skeleton"></div>
                        <div class="skel-line kns-skeleton" style="width: 90%;"></div>
                        <div class="skel-line kns-skeleton" style="width: 70%;"></div>
                        <div class="skel-line-xs kns-skeleton"></div>
                        <div class="skel-btn-group">
                            <div class="skel-btn kns-skeleton"></div>
                            <div class="skel-btn-sm kns-skeleton"></div>
                        </div>
                    </div>
                </div>
            `;
        }
        html += '</div>';
    },
    getBlogDetailSkeleton: () => {
        return `
            <div class="blog-detail-skeleton">
                <div class="skel-blog-hero kns-skeleton"></div>
                <div class="skel-blog-meta kns-skeleton"></div>
                <div class="skel-blog-title kns-skeleton"></div>
                <div class="skel-blog-line kns-skeleton"></div>
                <div class="skel-blog-line kns-skeleton med"></div>
                <div class="skel-blog-line kns-skeleton med"></div>
                <div class="skel-blog-line kns-skeleton short"></div>
                <br><br>
                <div class="skel-blog-line kns-skeleton"></div>
                <div class="skel-blog-line kns-skeleton med"></div>
                <div class="skel-blog-line kns-skeleton"></div>
                <div class="skel-blog-line kns-skeleton short"></div>
            </div>
        `;
    },
    getBlogSkeleton: (count = 3) => {
        let html = '<div class="kns-skeleton-container">';
        for(let i=0; i<count; i++) {
            html += `
                <div class="blog-card-skeleton">
                    <div class="skel-blog-img kns-skeleton"></div>
                    <div class="skel-blog-content">
                        <div class="skel-line-sm kns-skeleton"></div>
                        <div class="skel-line kns-skeleton" style="width: 100%;"></div>
                        <div class="skel-line kns-skeleton" style="width: 100%;"></div>
                        <div class="skel-line-xs kns-skeleton"></div>
                    </div>
                </div>
            `;
        }
        html += '</div>';
        return html;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer Setup
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    window.animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing once it's visible so it doesn't animate out and in repeatedly
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Reusable function to observe elements
    const observeElements = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-scale-up, .animate-slide-right, .animate-slide-left');
        animatedElements.forEach(el => window.animateObserver.observe(el));
    };

    // Initialize observer
    observeElements();

    // Subtle Navbar Shadow on Scroll
    const navbar = document.querySelector('.ecommerce-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                currentSlide = index;
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
                resetInterval();
            });
        });

        resetInterval();
    }

    // Modal Logic for Quote Buttons
    const quoteBtns = document.querySelectorAll('.quote-btn');
    const modal = document.getElementById('quote-modal');

    if (modal) {
        quoteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });
        });

        // Close modal if clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Initialize Lucide Icons globally
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Catalog Download Logic ---
    window.handleCatalogDownload = () => {
        if (typeof KNSAuth !== 'undefined' && KNSAuth.isLoggedIn()) {
            triggerCatalogDownload();
        } else {
            document.getElementById('catalog-modal')?.classList.add('is-open');
        }
    };

    window.closeCatalogModal = () => {
        document.getElementById('catalog-modal')?.classList.remove('is-open');
    };

    window.handleCatalogEmailSubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('catalog-email').value;
        if (email) {
            // reCAPTCHA v3 Execution
            if (window.grecaptcha) {
                grecaptcha.ready(async () => {
                    try {
                        const token = await grecaptcha.execute('6LfgZqYsAAAAAIARfVd_5xzKFB-IKP513QVxUgIh', { action: 'catalog_request' });
                        console.log("reCAPTCHA verified for catalog:", token);
                    } catch (err) {
                        console.warn("reCAPTCHA Error (Proceeding anyway):", err);
                    }

                    // Proceed with submission regardless of reCAPTCHA success
                    closeCatalogModal();
                    KNSCart.showToast(`Thank you! The catalog is now downloading.`);
                    triggerCatalogDownload();
                });
            } else {
                // Fallback if reCAPTCHA not loaded
                closeCatalogModal();
                triggerCatalogDownload();
            }
        }
    };

    window.triggerCatalogDownload = () => {
        // Mock download: In a real app, use window.location.href = 'catalog.pdf'
        // Here we simulate the process
        const link = document.createElement('a');
        link.href = 'https://pdfobject.com/pdf/sample.pdf'; // Sample PDF for demo
        link.target = '_blank';
        link.download = 'KNS-Furnitech-Catalog-2026.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (typeof KNSCart !== 'undefined' && KNSCart.showToast) {
            KNSCart.showToast('Opening Catalog in new tab... Switch back to this tab to continue shopping.');
        }
    };

    // --- Bestsellers Category Switching ---
    const bestsellersData = {
        'Executive Chair': [
            { id: 'ex-1', name: 'The Bureaucrat', price: 12499, img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?fm=webp&w=600&q=80' },
            { id: 'ex-2', name: 'The Classic', price: 14999, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?fm=webp&w=600&q=80' },
            { id: 'ex-3', name: 'The Intelligent', price: 15898, img: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?fm=webp&w=600&q=80' },
            { id: 'ex-4', name: 'The Diplomatic', price: 16499, img: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?fm=webp&w=600&q=80' },
            { id: 'ex-5', name: 'The Executive', price: 11999, img: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?fm=webp&w=600&q=80' }
        ],
        'Workstation Chair': [
            { id: 'ws-1', name: 'Task Master', price: 8500, img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba62d?fm=webp&w=600&q=80' },
            { id: 'ws-2', name: 'Pro Streamer', price: 15500, img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?fm=webp&w=600&q=80' },
            { id: 'ws-3', name: 'Efficient Mesh', price: 7999, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?fm=webp&w=600&q=80' },
            { id: 'ws-4', name: 'Agile Swivel', price: 9200, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?fm=webp&w=600&q=80' },
            { id: 'ws-5', name: 'Solid Base', price: 6800, img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?fm=webp&w=600&q=80' }
        ],
        'Plastic Metal - Cafe Chair': [
            { id: 'cc-1', name: 'Cafe Red', price: 2500, img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?fm=webp&w=500&q=80' },
            { id: 'cc-2', name: 'Bistro Metal', price: 3200, img: 'https://images.unsplash.com/photo-1503602642458-232111445657?fm=webp&w=500&q=80' },
            { id: 'cc-3', name: 'Stackable Pro', price: 1800, img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?fm=webp&w=500&q=80' },
            { id: 'cc-4', name: 'Garden Flex', price: 2100, img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?fm=webp&w=500&q=80' },
            { id: 'cc-5', name: 'Minimalist Poly', price: 2800, img: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?fm=webp&w=500&q=80' }
        ],
        'Bar Stool Chair': [
            { id: 'bs-1', name: 'High Rise', price: 4500, img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?fm=webp&w=500&q=80' },
            { id: 'bs-2', name: 'Industrial Loft', price: 5200, img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?fm=webp&w=500&q=80' },
            { id: 'bs-3', name: 'Swivel Pub', price: 5800, img: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?fm=webp&w=500&q=80' },
            { id: 'bs-4', name: 'Sleek Chrome', price: 6200, img: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?fm=webp&w=500&q=80' },
            { id: 'bs-5', name: 'Wooden Bistro', price: 3900, img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?fm=webp&w=500&q=80' }
        ],
        'Puffy Table Chair': [
            { id: 'pt-1', name: 'Cloud Cube', price: 8500, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?fm=webp&w=500&q=80' },
            { id: 'pt-2', name: 'Luxe Velvet', price: 12000, img: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?fm=webp&w=500&q=80' },
            { id: 'pt-3', name: 'Compact Round', price: 5500, img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?fm=webp&w=500&q=80' },
            { id: 'pt-4', name: 'Dressing Stool', price: 7200, img: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?fm=webp&w=500&q=80' },
            { id: 'pt-5', name: 'Storage Ottoman', price: 8900, img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?fm=webp&w=500&q=80' }
        ],
        'Sofa Lounge Seating': [
            { id: 'sl-1', name: 'Tycoon Sofa', price: 45999, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?fm=webp&w=600&q=80' },
            { id: 'sl-2', name: 'Majestic Recliner', price: 28500, img: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?fm=webp&w=600&q=80' },
            { id: 'sl-3', name: 'Royal Velvet Couch', price: 52000, img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?fm=webp&w=600&q=80' },
            { id: 'sl-4', name: 'Cloud L-Shape', price: 78000, img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?fm=webp&w=600&q=80' },
            { id: 'sl-5', name: 'Compact Loveseat', price: 19500, img: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?fm=webp&w=600&q=80' }
        ],
        'Educational Furniture': [
            { id: 'ed-1', name: 'Scholar Desk', price: 4500, img: 'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?fm=webp&w=600&q=80' },
            { id: 'ed-2', name: 'Library Rack', price: 8200, img: 'https://images.unsplash.com/photo-1507842217351-5185ba573b0f?fm=webp&w=600&q=80' },
            { id: 'ed-3', name: 'Seminar Chair', price: 3800, img: 'https://images.unsplash.com/photo-1517502884422-41eaadeff171?fm=webp&w=600&q=80' },
            { id: 'ed-4', name: 'Lab Stool', price: 2100, img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba62d?fm=webp&w=600&q=80' },
            { id: 'ed-5', name: 'Teacher Table', price: 6500, img: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?fm=webp&w=600&q=80' }
        ]
    };

    /**
     * Smart Bestsellers Engine
     * Dynamically ranks products based on Sales Frequency from All Orders.
     */
    function getSmartBestsellers(uiCategory, limit = 5) {
        // 1. Sync UI Tab Names to potential DB Category Variations
        const catMap = {
            'Executive Chair': ['Executive Chair', 'Executive Chairs'],
            'Workstation Chair': ['Workstation Chair', 'Workstations'],
            'Plastic Metal - Cafe Chair': ['Plastic Metal - Cafe Chair', 'Cafeteria Chairs'],
            'Bar Stool Chair': ['Bar Stool Chair', 'Bar Stools'],
            'Puffy Table Chair': ['Puffy Table Chair', 'Puffy & Tables'],
            'Sofa Lounge Seating': ['Sofa Lounge Seating', 'Sofa & Lounge'],
            'Educational Furniture': ['Educational Furniture', 'Educational']
        };
        const dbCatVariations = catMap[uiCategory] || [uiCategory];

        // 2. Data Sources
        const allOrders = (window.KNSData && KNSData.getAllOrders) ? KNSData.getAllOrders() : [];
        const allProducts = (window.KNSData && KNSData.getProducts) ? KNSData.getProducts() : [];

        // 3. Aggregate Sales Data
        const salesCounts = {};
        allOrders.forEach(order => {
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    const pid = item.id || item.productId;
                    if (pid) {
                        salesCounts[pid] = (salesCounts[pid] || 0) + (item.qty || 1);
                    }
                });
            }
        });

        // 4. Filter Catalog by Category
        let categoryProducts = allProducts.filter(p => dbCatVariations.includes(p.category));

        // 5. Case: Product exists but hasn't sold yet? Sort by sales count THEN newest first
        categoryProducts = categoryProducts.map(p => ({
            ...p,
            salesCount: salesCounts[p.id || p.firestoreId] || 0
        }));

        categoryProducts.sort((a, b) => b.salesCount - a.salesCount);

        // 6. Build Final Display List
        if (categoryProducts.length > 0) {
            // Uniqueness is guaranteed by Firestore IDs
            return categoryProducts.slice(0, limit).map(p => ({
                id: p.id || p.firestoreId || '',
                name: p.name,
                price: p.price,
                category: p.category,
                img: p.image || 'https://via.placeholder.com/600x480?text=No+Image',
                stock: p.stock
            }));
        }

        // 7. Last Resort Fallback (Hardcoded Demo Data)
        return bestsellersData[uiCategory] || [];
    }

    const bsTabs = document.querySelectorAll('.bs-tab');
    const bsContainer = document.querySelector('.bs-container');

    if (bsTabs.length > 0 && bsContainer) {
        // Arrow Navigation Logic (Single Item Switcher)
        const tabsWrapper = document.querySelector('.bs-tabs-wrapper');
        const nextBtn = document.getElementById('bs-next');
        const prevBtn = document.getElementById('bs-prev');

        const updateBestsellersByOffset = (offset) => {
            const currentActive = document.querySelector('.bs-tab.active');
            const tabsArray = Array.from(bsTabs);
            const currentIndex = tabsArray.indexOf(currentActive);
            let nextIndex = currentIndex + offset;

            if (nextIndex >= 0 && nextIndex < tabsArray.length) {
                tabsArray[nextIndex].click();
            }
        };

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => updateBestsellersByOffset(1));
            prevBtn.addEventListener('click', () => updateBestsellersByOffset(-1));

            // Hide/Show arrows based on position
            const toggleArrows = () => {
                const currentActive = document.querySelector('.bs-tab.active');
                const tabsArray = Array.from(bsTabs);
                const currentIndex = tabsArray.indexOf(currentActive);

                prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
                prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';

                nextBtn.style.opacity = currentIndex === tabsArray.length - 1 ? '0.3' : '1';
                nextBtn.style.pointerEvents = currentIndex === tabsArray.length - 1 ? 'none' : 'auto';
            };

            // Call it initially and on every click
            toggleArrows();

            // Map UI tab strings to actual database category strings
            const catMap = {
                'Executive Chair': 'Executive Chairs',
                'Workstation Chair': 'Workstations',
                'Plastic Metal - Cafe Chair': 'Cafeteria Chairs',
                'Bar Stool Chair': 'Bar Stools',
                'Puffy Table Chair': 'Puffy & Tables',
                'Sofa Lounge Seating': 'Sofa & Lounge',
                'Educational Furniture': 'Educational'
            };

            bsTabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    const uiCategory = tab.textContent.trim();
                    let products = getSmartBestsellers(uiCategory, 5);

                    if (!products) return;

                    bsTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    const tabsUl = document.querySelector('.bs-tabs');
                    if (tabsUl) {
                        tabsUl.style.transform = `translateX(-${index * 100}%)`;
                    }

                    toggleArrows();

                    // Update Container Completely ensuring dynamic card sizing based on DB length
                    if (bsContainer) {
                        bsContainer.innerHTML = '';
                        products.forEach((prod, i) => {
                            const delay = (i % 5) * 0.1;
                            const safeName = (prod.name || '').replace(/'/g, "\\'");
                            const safeCat = (prod.category || uiCategory).replace(/'/g, "\\'");
                            const url = prod.id ? `product.html?id=${prod.id}` : 'product.html';
                            const safeImg = prod.image || prod.img || 'https://via.placeholder.com/600x480?text=No+Image';

                            const addToCartFn = `window.KNSCart && window.KNSCart.addToCart ? ` +
                                `KNSCart.addToCart({id: '${prod.id}', name: '${safeName}', category: '${safeCat}', price: ${prod.price}, image: '${safeImg}', stock: ${prod.stock}})` +
                                ` : addToCart('${safeName}', ${prod.price}, '${safeImg}')`;

                            const bsCard = document.createElement('div');
                            bsCard.className = "bs-card animate-on-scroll is-visible";
                            bsCard.style.transitionDelay = `${delay}s`;
                            bsCard.innerHTML = `
                                <div class="bs-card-img-wrap">
                                    <img src="${safeImg}" alt="${prod.name}" width="300" height="240" loading="lazy">
                                </div>
                                <div class="bs-card-info">
                                    <h4>${prod.name}</h4>
                                    <span class="price">₹${(prod.price || 0).toLocaleString('en-IN')}</span>
                                    <div class="bs-card-actions">
                                        <a href="${url}" class="bs-action-btn bs-btn-details">
                                            <i data-lucide="eye" size="16"></i> View
                                        </a>
                                        ${(prod.stock <= 0 && prod.stock !== null && prod.stock !== undefined) ?
                                    `<button class="bs-action-btn bs-btn-cart" disabled style="opacity: 0.6; cursor: not-allowed;">
                                                Out of Stock
                                            </button>` :
                                    `<button class="bs-action-btn bs-btn-cart" onclick="${addToCartFn}">
                                                <i data-lucide="plus" size="16"></i> Add
                                            </button>`
                                }
                                    </div>
                                </div>
                            `;
                            bsContainer.appendChild(bsCard);
                        });
                        if (typeof lucide !== 'undefined') lucide.createIcons();
                    }
                });
            });

            // Initialize the first active tab specifically for DB load on load
            const initialTab = document.querySelector('.bs-tab.active');
            if (initialTab) setTimeout(() => initialTab.click(), 100);

            // Re-render the active tab silently whenever the cloud DB finishes fetching
            document.addEventListener('products:updated', () => {
                const activeTab = document.querySelector('.bs-tab.active');
                if (activeTab) activeTab.click();
            });
        }
    }

    // Page Transition Animation Interception
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const anchor = e.target.closest('a');
            if (!anchor) return;

            const target = anchor.getAttribute('href');
            // Only intercept valid internal links (ignore anchors, external, active quotes)
            if (target && !target.startsWith('#') && !target.startsWith('http') && !anchor.classList.contains('quote-btn')) {
                e.preventDefault();
                document.body.classList.add('page-exit');

                // Wait for CSS animation to finish before navigating
                setTimeout(() => {
                    window.location.href = target;
                }, 500);
            }
        });
    });
});

/* ── Smart Category Icons & Active State ── */
const KNSCategories = (() => {
    const iconMap = {
        "All": "layout-grid",
        "Executive Chair": "user-check",
        "Workstation Chair": "monitor",
        "Plastic Metal - Cafe Chair": "coffee",
        "Bar Stool Chair": "wine",
        "Puffy Table Chair": "box",
        "Sofa Lounge Seating": "armchair",
        "Educational Furniture": "graduation-cap"
    };

    function init() {
        const nav = document.querySelector('.categories-nav');
        if (!nav) return;

        const currentUrl = window.location.href;
        const urlParams = new URLSearchParams(window.location.search);
        const activeCat = urlParams.get('cat');

        nav.querySelectorAll('a').forEach(a => {
            const text = a.textContent.trim();
            const iconName = iconMap[text];

            // Inject Icon
            if (iconName) {
                const iconHtml = `<i data-lucide="${iconName}"></i>`;
                a.innerHTML = iconHtml + `<span>${text}</span>`;
            }

            // Handle Active State
            if (activeCat && text === activeCat) {
                a.classList.add('active');
            } else if (!activeCat && text === 'All' && currentUrl.includes('shop.html')) {
                a.classList.add('active');
            }
        });

        if (window.lucide) {
            lucide.createIcons();
        }
    }

    return { init };
})();

/* ── Global Hamburger Drawer Logic ── */
const KNSHamburger = (() => {
    function init() {
        // Inject Drawer HTML if not present
        if (!document.getElementById('side-menu-overlay')) {
            const drawerHTML = `
                <div class="side-menu-overlay" id="side-menu-overlay">
                    <div class="side-menu-content">
                        <div class="menu-drawer-header">
                            <a href="index.html" class="logo" style="gap: 0; align-items: baseline;">
                                <img src="images/logo.png" alt="KNS Furnitech" class="logo-img" style="height: 42px; transform: scale(2.2) translateY(4px) translateX(-2px); margin-right: -10px;">
                                <span style="font-weight: 800; font-size: 1.3rem; letter-spacing: -0.5px;">KNS FURNITECH</span>
                            </a>
                            <button class="close-menu" id="close-menu-btn">
                                <i data-lucide="x"></i>
                            </button>
                        </div>
                        <form class="menu-search-container" action="search-results.html" method="GET" style="display: flex; align-items: center; gap: 10px;">
                            <div style="position: relative; flex: 1;">
                                <i data-lucide="search" class="menu-search-icon"></i>
                                <input type="text" name="q" placeholder="Search website..." class="menu-search-input" required style="margin-bottom:0;">
                            </div>
                            <button type="submit" class="menu-search-submit-btn">
                                <i data-lucide="arrow-right"></i>
                            </button>
                        </form>
                        <div class="menu-section">
                            <h3 class="menu-section-title">Shop by Category</h3>
                            <ul class="menu-links">
                                <li><a href="shop.html"><i data-lucide="layout-grid"></i> All Collections</a></li>
                                <li><a href="shop.html?cat=Executive Chair"><i data-lucide="monitor"></i> Executive Chairs</a></li>
                                <li><a href="shop.html?cat=Workstation Chair"><i data-lucide="airplay"></i> Workstations</a></li>
                                <li><a href="shop.html?cat=Plastic Metal - Cafe Chair"><i data-lucide="coffee"></i> Cafeteria Chairs</a></li>
                                <li><a href="shop.html?cat=Bar Stool Chair"><i data-lucide="utensils"></i> Bar Stools</a></li>
                                <li><a href="shop.html?cat=Puffy Table Chair"><i data-lucide="layers"></i> Puffy & Tables</a></li>
                                <li><a href="shop.html?cat=Sofa Lounge Seating"><i data-lucide="sofa"></i> Sofa & Lounge</a></li>
                                <li><a href="shop.html?cat=Educational Furniture"><i data-lucide="graduation-cap"></i> Educational</a></li>
                            </ul>
                        </div>
                        <div class="menu-section">
                            <h3 class="menu-section-title">Company</h3>
                            <ul class="menu-links">
                                <li><a href="about.html"><i data-lucide="info"></i> About Us</a></li>
                                <li><a href="blog.html"><i data-lucide="newspaper"></i> Our Blog</a></li>
                                <li><a href="clients.html"><i data-lucide="users"></i> Our Clients</a></li>
                                <li><a href="contact.html"><i data-lucide="mail"></i> Contact Us</a></li>
                                <li><a href="catalogs.html"><i data-lucide="download"></i> Digital Catalog</a></li>
                            </ul>
                        </div>
                        <div class="menu-section" id="menu-account-section">
                            <h3 class="menu-section-title">Account</h3>
                            <ul class="menu-links" id="menu-auth-links">
                                <li><a href="signin.html"><i data-lucide="log-in"></i> Sign In</a></li>
                                <li><a href="orders.html"><i data-lucide="package"></i> My Orders</a></li>
                                <li><a href="track-order.html"><i data-lucide="truck"></i> Track Order</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', drawerHTML);
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        const overlay = document.getElementById('side-menu-overlay');
        const closeBtn = document.getElementById('close-menu-btn');

        // Toggle Logic
        document.addEventListener('click', (e) => {
            if (e.target.closest('.hamburger-btn')) {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                updateAuthStatus();
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Global Logo Redirect
        document.addEventListener('click', (e) => {
            if (e.target.closest('.logo')) {
                window.location.href = 'index.html';
            }
        });

        initBackToTop();
    }

    function updateAuthStatus() {
        const authLinks = document.getElementById('menu-auth-links');
        if (typeof KNSAuth !== 'undefined' && KNSAuth.isLoggedIn()) {
            const user = KNSAuth.getUser();
            const isAdmin = KNSAuth.isAdmin();
            authLinks.innerHTML = `
                ${isAdmin ? '<li><a href="admin.html" style="color: var(--brand-green); font-weight: 700;"><i data-lucide="shield-check"></i> Admin Dashboard</a></li>' : ''}
                <li><a href="profile.html"><i data-lucide="user"></i> My Profile</a></li>
                <li><a href="orders.html"><i data-lucide="package"></i> My Orders</a></li>
                <li><a href="track-order.html"><i data-lucide="truck"></i> Track Order</a></li>
                <li><a href="wishlist.html"><i data-lucide="heart"></i> My Wishlist</a></li>
                <li><a href="#" onclick="KNSAuth.logout(); location.reload();"><i data-lucide="log-out"></i> Sign Out</a></li>
            `;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
    }

    function initBackToTop() {
        if (document.getElementById('kns-back-to-top')) return;
        const btnHTML = `<button id="kns-back-to-top" title="Back to Top"><i data-lucide="chevron-up"></i></button>`;
        document.body.insertAdjacentHTML('beforeend', btnHTML);
        const btn = document.getElementById('kns-back-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    return { init };
})();

/* ── Global Bootstrapper ── */
document.addEventListener('DOMContentLoaded', () => {
    KNSCategories.init();
    KNSHamburger.init();
});

/* Legacy Mega Menu Disabled */
const KNSMegaMenu = { init: () => { } };