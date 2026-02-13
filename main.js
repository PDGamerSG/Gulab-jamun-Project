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

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetContent = document.querySelector(targetId);

            if (targetContent) {
                e.preventDefault();
                // Update active link if it's in the nav
                if (link.closest('.nav-links')) {
                    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }

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

    // Card Glow effect for Solution section
    const solutionCards = document.querySelectorAll('.solution-card-premium');
    solutionCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

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
        threshold: 0.1,
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

    // Jamun Live Chat (Gemini Integration)
    const jamunChat = document.getElementById('jamunChat');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');

    // API Configurations
    const GEMINI_API_KEY = "AIzaSyD6NZsh8RuwApTf--tttIBvO55Gtee9hvQ";
    const SYSTEM_PROMPT = "You are Jamun, a smart retail AI assistant for the Gulabjamun platform. You help retailers with analyzing sales data, managing inventory, optimizing menus, and other retail operations. Be helpful, professional, and concise. Use retail emojis. Current date: Feb 13, 2026.";

    let chatHistory = [];
    let isTyping = false;

    function addMessage(text, type, isHtml = false) {
        if (!jamunChat) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        if (isHtml) {
            msgDiv.innerHTML = text;
        } else {
            msgDiv.innerHTML = `<p>${text}</p>`;
        }
        jamunChat.appendChild(msgDiv);
        jamunChat.scrollTop = jamunChat.scrollHeight;
    }

    function showTyping() {
        if (isTyping) return;
        isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        jamunChat.appendChild(typingDiv);
        jamunChat.scrollTop = jamunChat.scrollHeight;
    }

    function hideTyping() {
        isTyping = false;
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    async function handleChat() {
        const text = chatInput.value.trim();
        if (!text || isTyping) return;

        const lowText = text.toLowerCase();

        // User Message
        addMessage(text, 'user');
        chatInput.value = '';

        showTyping();

        // 1. Keyword Check: Hi / Hello
        if (lowText === 'hi' || lowText === 'hello') {
            setTimeout(() => {
                hideTyping();
                addMessage("Welcome! I'm Jamun 🍇, your retail intelligence assistant. How can I help you scale your business today?", 'jamun');
            }, 800);
            return;
        }

        // 2. Keyword Check: Sales Report
        if (lowText.includes('sales report')) {
            setTimeout(() => {
                hideTyping();
                addMessage("Analyzing your sales data from all 5 store locations... 🔄", 'jamun');
                showTyping();

                setTimeout(() => {
                    hideTyping();
                    const reportHtml = `
                        <div class="analysis-card">
                            <div class="card-header">Weekly Sales Report</div>
                            <p><strong>Total Revenue:</strong> ₹4,25,000 (+12%)</p>
                            <p><strong>Top Store:</strong> South Delhi Hub</p>
                            <p><strong>Bestseller:</strong> Gulab Mix (500g)</p>
                            <button class="chat-action-btn">Download Full PDF</button>
                        </div>
                    `;
                    addMessage(reportHtml, 'jamun', true);
                }, 2000);
            }, 1000);
            return;
        }

        // 3. Fallback to Gemini API
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                    contents: [...chatHistory, { role: "user", parts: [{ text: text }] }]
                })
            });

            const data = await response.json();
            hideTyping();

            if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
                const aiResponse = data.candidates[0].content.parts[0].text;
                addMessage(aiResponse, 'jamun');

                chatHistory.push({ role: "user", parts: [{ text: text }] });
                chatHistory.push({ role: "model", parts: [{ text: aiResponse }] });
                if (chatHistory.length > 10) chatHistory = chatHistory.slice(-10);
            } else {
                throw new Error("API Issue");
            }
        } catch (error) {
            hideTyping();
            addMessage("I'm experiencing a small glitch in the retail cloud. Mind trying again?", 'jamun');
            console.error("Gemini Error:", error);
        }
    }

    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', handleChat);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChat();
        });
    }

    // Initial greeting
    if (jamunChat && jamunChat.children.length === 0) {
        setTimeout(() => {
            addMessage("Hello! I'm Jamun 🍇. How can I help you scale your retail business today?", 'jamun');
        }, 800);
    }
});
