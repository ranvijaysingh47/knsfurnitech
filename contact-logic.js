(function() {
    // EmailJS Credentials Integration
    const EMAILJS_PUBLIC_KEY = "2v821_ac_z9iaLaP5"; 
    const EMAILJS_SERVICE_ID = "service_hp4dkel"; 
    const EMAILJS_TEMPLATE_ID = "template_g1ac95b"; 
    
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    window.KNSContact = {
        sendInquiry: async (data, form, submitBtn, originalBtnText) => {
            if (submitBtn) {
                submitBtn.innerText = 'Sending...';
                submitBtn.disabled = true;
            }

            // 1. Save to Firestore (Database Backup)
            try {
                console.log("Saving to Firestore...");
                if (window.KNSDb && typeof KNSDb.saveInquiry === 'function') {
                    await KNSDb.saveInquiry(data);
                } else {
                    console.warn("KNSDb.saveInquiry not found.");
                }
            } catch (err) { console.error("Firestore Error:", err); }

            // 2. Send via EmailJS (Option 3 - Frontend Notification)
            let emailSent = false;
            try {
                if (typeof emailjs !== 'undefined') {
                    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                        from_name: data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Valued Customer',
                        from_email: data.email,
                        phone: data.phone || data.phoneNumber || 'N/A',
                        message: data.message || `Bulk Inquiry for ${data.companyName || 'N/A'} (Qty: ${data.quantity || 'N/A'})`,
                        to_name: "KNS Furnitech Support"
                    });
                    emailSent = true;
                    console.log("EmailJS Success!");
                }
            } catch (err) { console.warn("EmailJS failed, trying fallback...", err); }

            // 3. Send via Hostinger PHP Mailer (Option 4 - Backend Notification)
            if (!emailSent && window.location.protocol !== 'file:') {
                try {
                    const phpRes = await fetch('mail.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
                    const phpResult = await phpRes.json();
                    if (phpResult && phpResult.ok) emailSent = true;
                } catch (err) { console.error("PHP Mailer Error:", err); }
            }

            if (emailSent || window.location.protocol === 'file:') {
                alert('Thank you! Your inquiry has been received. Our team will contact you shortly.');
                if (form) form.reset();
                
                // Close modals if open
                ['quote-modal', 'bulk-modal', 'catalog-modal'].forEach(id => {
                    const modal = document.getElementById(id);
                    if (modal) modal.classList.remove('active', 'is-open');
                });
            } else {
                // Ultimate Fallback: Mailto
                const subject = encodeURIComponent("New Inquiry: " + (data.name || data.firstName || data.companyName));
                const body = encodeURIComponent(`Message from ${data.name || data.firstName || data.email}:\n\n${data.message}`);
                window.location.href = `mailto:Knsfurnitech@gmail.com?subject=${subject}&body=${body}`;
            }

            if (submitBtn) {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        }
    };
})();
