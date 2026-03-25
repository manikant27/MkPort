// script.js

// 1. Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Slight delay for the outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor hover effect on interactable elements
    const interactables = document.querySelectorAll('a, button, input, textarea');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(88, 166, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// 2. Scroll Progress Bar
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    if (scrollProgress) {
        const totalScroll = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (totalScroll / scrollHeight) * 100;
        scrollProgress.style.width = `${scrollPercentage}%`;
    }
});

// 3. Navbar Sticky & Active Link Highlight
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Nav background change
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Active Link Highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current !== '') {
            link.classList.add('active');
        }
    });
});

// 4. Hamburger Menu (Mobile Navigation)
const hamburger = document.querySelector('.hamburger');
const navLinksMenu = document.querySelector('.nav-links');

if (hamburger && navLinksMenu) {
    hamburger.addEventListener('click', () => {
        navLinksMenu.classList.toggle('active');
        hamburger.innerHTML = navLinksMenu.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// 5. Typing Animation (Hero Section)
const typingText = document.querySelector('.typing-text');
const words = ["AI Developer", "Machine Learning Enthusiast", "Data Analyst", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500; // Pause before next word
    }

    setTimeout(typeEffect, speed);
}

// Start typing animation on load
window.addEventListener('DOMContentLoaded', () => {
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }
});

// 6. Intersection Observer for Scroll Animations (Fade-in / Slide-up)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const animationClass = entry.target.getAttribute('data-animation');
            if (animationClass) {
                entry.target.classList.add(animationClass);
                entry.target.classList.remove('hidden');
            }
            // Optional: Unobserve after animating once
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden').forEach(el => {
    observer.observe(el);
});

// 7. Tilt Effect for Cards (3D interaction)
const cards = document.querySelectorAll('.glass-card');
if (window.matchMedia("(min-width: 768px)").matches) {
    // Only apply tilt effect on non-touch (desktop) devices where it looks best
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)`;
        });
    });
}

// 8. Handle Form Submit with Real Email (Formsubmit)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Use FormSubmit AJAX API to send real emails
        fetch("https://formsubmit.co/ajax/manikantkumar2749@gmail.com", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        })
            .then(response => response.json())
            .then(data => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#2ea043';
                submitBtn.style.color = '#fff';
                contactForm.reset();

                // Revert button back to normal after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = 'var(--primary-color)';
                    submitBtn.style.color = '#000';
                }, 3000);
            })
            .catch(error => {
                submitBtn.innerHTML = '<i class="fas fa-times"></i> Error!';
                submitBtn.style.background = '#f85149';
                submitBtn.style.color = '#fff';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = 'var(--primary-color)';
                    submitBtn.style.color = '#000';
                }, 3000);
            });
    });
}

// 9. Canvas Particle Network Background
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles;

    function initCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        particles = [];

        // Adjust particle count based on screen size
        const particleCount = Math.floor(width * height / 12000);

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Velocity
            this.vx = (Math.random() - 0.5) * 1.2;
            this.vy = (Math.random() - 0.5) * 1.2;
            // Radius
            this.radius = Math.random() * 2 + 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(88, 166, 255, 0.6)';
            ctx.fill();
        }
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 140) {
                    ctx.beginPath();
                    // Opacity depends on distance
                    const opacity = 1 - (distance / 140);
                    ctx.strokeStyle = `rgba(88, 166, 255, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateCanvas);
    }

    initCanvas();
    animateCanvas();

    // Handle Resize
    window.addEventListener('resize', () => {
        initCanvas();
    });
}
