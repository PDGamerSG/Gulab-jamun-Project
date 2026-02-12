document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header-container');
    const nav = document.querySelector('.glass-nav');

    // Header scroll background effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '12px 20px';
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.15)';
        } else {
            header.style.padding = '24px 20px';
            nav.style.background = 'rgba(255, 255, 255, 0.6)';
            nav.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.07)';
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetContent = document.querySelector(targetId);

            if (targetContent) {
                // Update active link
                document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                window.scrollTo({
                    top: targetContent.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle (simple version)
    const mobileToggle = document.querySelector('.mobile-toggle');
    mobileToggle.addEventListener('click', () => {
        alert('Mobile menu functionality would be implemented here with a slide-out drawer or overlay.');
    });

    // Add some subtle mouse move effect to background blobs
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 50;
        const y = (e.clientY / window.innerHeight) * 50;

        const blobs = document.querySelectorAll('.bg-blob');
        blobs.forEach((blob, index) => {
            const shift = (index + 1) * 0.5;
            blob.style.transform = `translate(${x * shift}px, ${y * shift}px)`;
        });
    });

    // Dashboard Tilt Effect on Scroll
    const dashboardFrame = document.querySelector('.dashboard-frame');
    if (dashboardFrame) {
        window.addEventListener('scroll', () => {
            const rect = dashboardFrame.getBoundingClientRect();
            const viewHeight = window.innerHeight;

            // Percentage of height from top of viewport
            const scrollRatio = rect.top / viewHeight;

            // Map rotation: more tilted when at bottom
            let rotation = (scrollRatio - 0.2) * 30;
            rotation = Math.max(0, Math.min(20, rotation));

            dashboardFrame.style.transform = `rotateX(${rotation}deg)`;
        });
    }

    // Reveal Animations using Intersection Observer
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all others
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle current
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });
});
