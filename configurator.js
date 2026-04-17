/* ================================================================
   configurator.js — KNS Furnitech | 3D Virtual Configurator
   Handles embedded 3D section activation for specific products.
   ================================================================ */

const KNSConfigurator = (() => {
    const SECTION_ID = 'pdp-3d-section';
    const VIEWER_ID = 'pdp-3d-viewer';

    // Target Product Keywords
    const TARGET_KEYWORDS = ['monarch-elite', 'monarch elite'];

    function init(product) {
        if (!product) return;

        const section = document.getElementById(SECTION_ID);
        if (!section) return;

        const name = (product.name || '').toLowerCase();
        const id = (product.id || '').toLowerCase();
        
        // Check if product is a 3D-enabled product
        const isTarget = TARGET_KEYWORDS.some(k => name.includes(k) || id.includes(k));

        if (isTarget) {
            console.log("🛠️ [KNSConfigurator] Enabling 3D Experience Section.");
            section.style.display = 'block';
            
            // Set default color once model loads
            const viewer = document.getElementById(VIEWER_ID);
            if (viewer) {
                viewer.addEventListener('load', () => {
                    console.log("📦 [KNSConfigurator] Model loaded, setting default: Tan");
                    window.change3DColor('#D2B48C', 'Tan Leather');
                }, { once: true });
            }

            // Re-render Lucide icons inside the newly visible section
            if (window.lucide) window.lucide.createIcons();
        } else {
            section.style.display = 'none';
        }
    }

    return { init };
})();

// 3D Color Swapping Logic (PBR Material Manipulation)
window.change3DColor = (hex, label) => {
    const viewer = document.getElementById('pdp-3d-viewer');
    if (!viewer || !viewer.model) {
        console.warn("⚠️ [KNSConfigurator] 3D Model not loaded yet.");
        return;
    }

    // Convert HEX to RGB decimal (0-1)
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    // Apply color to all materials
    viewer.model.materials.forEach(mat => {
        if (mat.pbrMetallicRoughness) {
            mat.pbrMetallicRoughness.setBaseColorFactor([r, g, b, 1.0]);
        }
    });

    console.log(`🎨 [KNSConfigurator] Fabric changed to: ${label} (${hex})`);
};

// Initialization Poller
(function autoWire() {
    // Development Helper: Detect Local File protocol issues
    if (window.location.protocol === 'file:') {
        const disclaimer = document.createElement('div');
        disclaimer.style = "position:fixed; bottom:0; left:0; width:100%; background:rgba(0,0,0,0.85); color:#fff; padding:12px; text-align:center; z-index:10000; font-size:13px;";
        disclaimer.innerHTML = "🚀 <strong>Local Source Alert:</strong> Use <strong>VS Code Live Server</strong> to see the 3D chair model (CORS safety)!";
        document.body.appendChild(disclaimer);
    }

    let attempts = 0;
    const maxAttempts = 20; 
    
    const poller = setInterval(() => {
        attempts++;
        if (window.ActiveProduct) {
            KNSConfigurator.init(window.ActiveProduct);
            clearInterval(poller);
        } else if (attempts >= maxAttempts) {
            clearInterval(poller);
        }
    }, 500);
})();
