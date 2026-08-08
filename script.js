// ============================================
// Classic Fumigation - Optimized Core Script
// Zero Floating / Parallax Lag, High Performance
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    /*====================================
      Sticky Navbar on Scroll
    ====================================*/
    const navbar = document.querySelector(".custom-navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }, { passive: true });
    }

    /*====================================
      Scrollspy & Dynamic Moving Underline
    ====================================*/
    const navbarNav = document.querySelector(".navbar-nav");
    const desktopNavLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
    const sections = document.querySelectorAll("section[id]");

    let indicator = document.querySelector(".nav-underline-indicator");
    if (navbarNav && !indicator) {
        indicator = document.createElement("span");
        indicator.className = "nav-underline-indicator";
        navbarNav.appendChild(indicator);
    }

    function moveIndicator(targetLink) {
        if (!targetLink || !indicator || !navbarNav) return;
        const navRect = navbarNav.getBoundingClientRect();
        const linkRect = targetLink.getBoundingClientRect();
        const left = linkRect.left - navRect.left + (linkRect.width * 0.15);
        const width = linkRect.width * 0.7;

        indicator.style.left = `${left}px`;
        indicator.style.width = `${width}px`;
        indicator.style.opacity = "1";
    }

    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 120;
        let activeSectionId = "";

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPosition >= top && scrollPosition < top + height) {
                activeSectionId = id;
            }
        });

        if (window.scrollY < 100) {
            activeSectionId = "home";
        } else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 60) {
            activeSectionId = "contact";
        }

        if (activeSectionId) {
            let currentActiveDesktopLink = null;

            desktopNavLinks.forEach(link => {
                const href = link.getAttribute("href");
                const targetId = href ? href.replace("#", "") : "";

                if (targetId === activeSectionId || (activeSectionId === "home" && (href === "#" || href === "#home"))) {
                    link.classList.add("active");
                    currentActiveDesktopLink = link;
                } else {
                    link.classList.remove("active");
                }
            });

            mobileNavLinks.forEach(link => {
                const href = link.getAttribute("href");
                const targetId = href ? href.replace("#", "") : "";

                if (targetId === activeSectionId || (activeSectionId === "home" && (href === "#" || href === "#home"))) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });

            if (currentActiveDesktopLink) {
                moveIndicator(currentActiveDesktopLink);
            }
        }
    }

    let isNavTicking = false;
    window.addEventListener("scroll", () => {
        if (!isNavTicking) {
            window.requestAnimationFrame(() => {
                updateActiveNavOnScroll();
                isNavTicking = false;
            });
            isNavTicking = true;
        }
    }, { passive: true });

    window.addEventListener("resize", () => {
        const activeLink = document.querySelector(".navbar-nav .nav-link.active");
        if (activeLink) moveIndicator(activeLink);
    });

    desktopNavLinks.forEach(link => {
        link.addEventListener("mouseenter", () => moveIndicator(link));
        link.addEventListener("mouseleave", () => {
            const activeLink = document.querySelector(".navbar-nav .nav-link.active");
            if (activeLink) moveIndicator(activeLink);
        });
        link.addEventListener("click", function() {
            desktopNavLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
            moveIndicator(this);
        });
    });

    setTimeout(updateActiveNavOnScroll, 150);

    /*====================================
      Mobile Menu Auto Close
    ====================================*/
    const offcanvasElement = document.getElementById("mobileMenu");
    const mobileLinks = document.querySelectorAll(".mobile-nav a");

    if (offcanvasElement) {
        const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                offcanvas.hide();
            });
        });
    }

    /*====================================
      Smooth Scroll with Navbar Offset
    ====================================*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = 75;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /*==========================================
        COUNTER ANIMATION (SCROLL REVEAL ONLY)
    ==========================================*/
    const counters = document.querySelectorAll(".counter");
    const speed = 200;

    const runCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        const update = () => {
            const current = +counter.innerText;
            const increment = Math.ceil(target / speed);
            if (current < target) {
                counter.innerText = current + increment;
                requestAnimationFrame(update);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        update();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    /*==========================================
        SIMPLE SCROLL REVEAL (FADE IN ONCE)
    ==========================================*/
    const revealItems = document.querySelectorAll(
        ".hero-content > *, .about-image-box, .about-content, .about-card, .service-card, .why-card, .timeline-item, .gallery-card, .contact-info-card, .contact-form-card"
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(item => revealObserver.observe(item));

    /*=========================================
        BEFORE / AFTER HOVER COMPARISON
    =========================================*/
    const containers = document.querySelectorAll(".comparison-container");

    containers.forEach(container => {
        const afterImage = container.querySelector(".after-image");
        const line = container.querySelector(".slider-line");
        const sliderInput = container.querySelector(".comparison-slider");

        function setSplit(percentage) {
            const clamped = Math.max(5, Math.min(95, percentage));
            if (afterImage) afterImage.style.width = clamped + "%";
            if (line) line.style.left = clamped + "%";
            if (sliderInput) sliderInput.value = clamped;
        }

        container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            setSplit(percentage);
        });

        container.addEventListener("mouseleave", () => {
            setSplit(50);
        });

        container.addEventListener("touchmove", (e) => {
            if (e.touches.length > 0) {
                const rect = container.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                setSplit(percentage);
            }
        }, { passive: true });

        if (sliderInput) {
            sliderInput.addEventListener("input", (e) => {
                setSplit(e.target.value);
            });
        }
    });

    /*==================================================
        TESTIMONIAL MARQUEE PAUSE ON HOVER/TOUCH
    ==================================================*/
    const slider = document.querySelector(".testimonial-slider");
    const track = document.querySelector(".testimonial-track");

    if (slider && track) {
        slider.addEventListener("mouseenter", () => {
            track.style.animationPlayState = "paused";
        });
        slider.addEventListener("mouseleave", () => {
            track.style.animationPlayState = "running";
        });
        slider.addEventListener("touchstart", () => {
            track.style.animationPlayState = "paused";
        }, { passive: true });
        slider.addEventListener("touchend", () => {
            track.style.animationPlayState = "running";
        }, { passive: true });
    }

    /*==========================================
        CONTACT FORM SUBMISSION
    ==========================================*/
    const form = document.getElementById("contactForm");
    const success = document.getElementById("formSuccess");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value;
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !phone || !service || !message) {
                alert("Please fill all required fields.");
                return;
            }

            const button = form.querySelector(".contact-btn");
            if (button) {
                button.disabled = true;
                button.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Sending...`;

                setTimeout(function () {
                    button.disabled = false;
                    button.innerHTML = `<i class="bi bi-send-fill me-1"></i> Send Message`;
                    if (success) {
                        success.style.display = "block";
                        form.reset();
                        setTimeout(() => { success.style.display = "none"; }, 5000);
                    }
                }, 1500);
            }
        });
    }

    /*==================================================
        BACK TO TOP BUTTON
    ==================================================*/
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 300) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        }, { passive: true });

        backToTop.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /*==================================================
        NEWSLETTER VALIDATION
    ==================================================*/
    const newsletterForm = document.querySelector(".newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector("input");
            if (!emailInput) return;

            const email = emailInput.value.trim();
            if (!email) {
                alert("Please enter your email address.");
                return;
            }

            const button = newsletterForm.querySelector(".newsletter-btn");
            if (button) {
                button.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Subscribing...`;
                button.disabled = true;
                setTimeout(function() {
                    button.innerHTML = "Subscribed ✓";
                    emailInput.value = "";
                    setTimeout(function() {
                        button.innerHTML = "Subscribe";
                        button.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }

});