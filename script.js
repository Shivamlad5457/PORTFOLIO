// Interactive portfolio JavaScript for Shivam Lad

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle for Mobile
    const toggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll("#navbar a");

    if (toggle && navbar) {
        toggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
            const icon = toggle.querySelector("i");
            if (icon) {
                if (navbar.classList.contains("active")) {
                    icon.className = "fa-solid fa-xmark";
                } else {
                    icon.className = "fa-solid fa-bars";
                }
            }
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                const icon = toggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            });
        });
    }

    // Active link highlighting on scroll
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");
            const navLink = document.querySelector(`#navbar a[href*='${sectionId}']`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(l => l.classList.remove("active-link"));
                if (navLink) navLink.classList.add("active-link");
            }
        });
    });

    // Theme Switcher (Defaults to Light/Whitish theme as requested)
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("portfolio-theme") || "light";

    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            themeToggleBtn.setAttribute("title", "Switch to Light Mode");
        }
    } else {
        document.body.classList.remove("dark-theme");
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            themeToggleBtn.setAttribute("title", "Switch to Dark Mode");
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            let theme = "light";
            if (document.body.classList.contains("dark-theme")) {
                theme = "dark";
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
                themeToggleBtn.setAttribute("title", "Switch to Light Mode");
            } else {
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
                themeToggleBtn.setAttribute("title", "Switch to Dark Mode");
            }
            localStorage.setItem("portfolio-theme", theme);
            showToast(`Switched to ${theme} mode!`);
        });
    }

    // Typing Effect in Hero Section
    const typingElement = document.getElementById("typing-text");
    if (typingElement) {
        const roles = [
            "Software Engineer",
            "Full Stack Developer"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeEffect() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400;
            }

            setTimeout(typeEffect, typingSpeed);
        }

        typeEffect();
    }

    // Certifications & Achievements Filtering & Search
    const certFilterBtns = document.querySelectorAll(".cert-filter-btn");
    const certCards = document.querySelectorAll(".cert-item");
    const certSearchInput = document.getElementById("cert-search");

    function filterCertificates() {
        const activeFilter = document.querySelector(".cert-filter-btn.active")?.dataset.filter || "all";
        const searchQuery = certSearchInput ? certSearchInput.value.toLowerCase().trim() : "";

        let visibleCount = 0;

        certCards.forEach(card => {
            const category = card.dataset.category;
            const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
            const issuer = card.querySelector(".cert-issuer")?.textContent.toLowerCase() || "";
            const tags = card.dataset.tags ? card.dataset.tags.toLowerCase() : "";

            const matchesFilter = (activeFilter === "all") || (category === activeFilter);
            const matchesSearch = title.includes(searchQuery) || issuer.includes(searchQuery) || tags.includes(searchQuery);

            if (matchesFilter && matchesSearch) {
                card.style.display = "flex";
                card.classList.add("fade-in-card");
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        const noResultsMsg = document.getElementById("no-cert-results");
        if (noResultsMsg) {
            if (visibleCount === 0) {
                noResultsMsg.style.display = "block";
            } else {
                noResultsMsg.style.display = "none";
            }
        }
    }

    certFilterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            certFilterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filterCertificates();
        });
    });

    if (certSearchInput) {
        certSearchInput.addEventListener("input", filterCertificates);
    }

    // Projects Category Filter
    const projectFilterBtns = document.querySelectorAll(".proj-filter-btn");
    const projectCards = document.querySelectorAll(".project-card-item");

    projectFilterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            projectFilterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                if (filter === "all" || card.dataset.category === filter) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Copy Email Functionality
    const copyEmailBtn = document.getElementById("copy-email-btn");
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", () => {
            const email = "shivamlad.0909@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                showToast("Email address copied to clipboard!");
            }).catch(() => {
                showToast("Failed to copy email");
            });
        });
    }

    // Contact Form Interactive Handling
    const contactForm = document.getElementById("portfolio-contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("form-name")?.value || "";
            const email = document.getElementById("form-email")?.value || "";
            const message = document.getElementById("form-message")?.value || "";

            if (!name || !email || !message) {
                showToast("Please fill in all fields!");
                return;
            }

            // Create mailto link for direct sending
            const mailtoUri = `mailto:shivamlad.0909@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")")}`;
            window.open(mailtoUri, '_blank');

            showToast("Opening mail client to send message!");
            contactForm.reset();
        });
    }

    // Modal Details Viewer for Certificates & Achievements
    const modal = document.getElementById("credential-modal");
    const modalCloseBtn = document.getElementById("modal-close");
    const viewDetailBtns = document.querySelectorAll(".btn-view-detail");

    viewDetailBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const title = btn.dataset.title;
            const issuer = btn.dataset.issuer;
            const link = btn.dataset.link;
            const desc = btn.dataset.desc;
            const category = btn.dataset.category === "achievement" ? "Achievement / Internship" : "Certification";

            document.getElementById("modal-title").textContent = title;
            document.getElementById("modal-issuer").textContent = issuer;
            document.getElementById("modal-category").textContent = category;
            document.getElementById("modal-desc").textContent = desc;

            const modalLink = document.getElementById("modal-link");
            if (modalLink) {
                modalLink.href = link;
            }

            if (modal) {
                modal.classList.add("modal-open");
            }
        });
    });

    if (modalCloseBtn && modal) {
        modalCloseBtn.addEventListener("click", () => {
            modal.classList.remove("modal-open");
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("modal-open");
            }
        });
    }

    // Resume PDF Preview Modal Handler
    const resumeModal = document.getElementById("resume-modal");
    const resumeModalCloseBtn = document.getElementById("resume-modal-close");
    const downloadResumeBtns = document.querySelectorAll("#download-resume-btn, .btn-resume-trigger");

    downloadResumeBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (resumeModal) {
                e.preventDefault();
                resumeModal.classList.add("modal-open");
            }
        });
    });

    if (resumeModalCloseBtn && resumeModal) {
        resumeModalCloseBtn.addEventListener("click", () => {
            resumeModal.classList.remove("modal-open");
        });

        window.addEventListener("click", (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.remove("modal-open");
            }
        });
    }

    // Scroll reveal animation with IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
});

// Toast notification helper
function showToast(message) {
    let toast = document.getElementById("toast-notification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast-notification";
        toast.className = "toast";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
