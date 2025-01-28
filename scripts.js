// scripts.js - Modern & Professional Version
document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.main-nav');
    const header = document.querySelector('.sticky-header');
    const body = document.body;
    let lastScroll = 0;

    if (mobileMenuBtn && mobileNav) {
        // Toggle menu
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active class
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            // Body scroll lock
            if (mobileNav.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        mobileNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Handle resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Header scroll behavior
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });

    // Slideshow Functionality
    const initSlideshow = () => {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const slideContainer = document.querySelector('.slideshow-container');
        
        if (!slides.length) return;

        // Mouse/Touch variables
        let isDragging = false;
        let startPos = 0;
        let currentTranslate = 0;
        let dragThreshold = 100;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.remove('active', 'next', 'prev', 'moving-next', 'moving-prev');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        };

        window.plusSlides = (n) => {
            const nextIndex = (currentSlide + n + slides.length) % slides.length;
            const direction = n > 0 ? 'moving-next' : 'moving-prev';
            
            // Geçiş efekti için
            slides[nextIndex].classList.add(direction);
            setTimeout(() => {
                currentSlide = nextIndex;
                showSlide(currentSlide);
            }, 50);
        };

        // Mouse Events
        slideContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startPos = e.clientX;
        });

        slideContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const diff = e.clientX - startPos;
            currentTranslate = diff;

            // Geçerli slide'ı hareket ettir
            slides[currentSlide].style.transform = `translateX(${diff}px)`;
            
            // Sonraki ve önceki slide'ları da hareket ettir
            const nextSlide = slides[(currentSlide + 1) % slides.length];
            const prevSlide = slides[(currentSlide - 1 + slides.length) % slides.length];
            
            if (diff < 0) {
                nextSlide.style.transform = `translateX(calc(100% + ${diff}px))`;
            } else {
                prevSlide.style.transform = `translateX(calc(-100% + ${diff}px))`;
            }
        });

        slideContainer.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;

            if (Math.abs(currentTranslate) > dragThreshold) {
                if (currentTranslate > 0) {
                    plusSlides(-1);
                } else {
                    plusSlides(1);
                }
            } else {
                showSlide(currentSlide);
            }

            // Reset transforms
            slides.forEach(slide => {
                slide.style.transform = '';
            });
        });

        slideContainer.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                showSlide(currentSlide);
                // Reset transforms
                slides.forEach(slide => {
                    slide.style.transform = '';
                });
            }
        });

        // Initialize first slide
        showSlide(0);
    };

    // Slide Controls
    document.querySelector('.next')?.addEventListener('click', () => {
        plusSlides(1);
    });
    document.querySelector('.prev')?.addEventListener('click', () => {
        plusSlides(-1);
    });

    // Touch Support for Slideshow
    let touchStartX = 0;
    document.querySelector('.slideshow-container')?.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    document.querySelector('.slideshow-container')?.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            diff > 0 ? plusSlides(1) : plusSlides(-1);
        }
    });

    // Charts Initialization
    const initCharts = () => {
        const chartConfig = {
            population: {
                type: 'line',
                data: {
                    labels: ['2020', '2021', '2022', '2023', '2024'],
                    datasets: [{
                        label: 'Population',
                        data: [121493, 125812, 130835, 133177, 136124],
                        borderColor: '#ff5f6d',
                        tension: 0.4
                    }]
                }
            },
            propertyPrices: {
                type: 'bar',
                data: {
                    labels: ['2020', '2021', '2022', '2023', '2024'],
                    datasets: [{
                        label: 'Average Price (TL)',
                        data: [750000, 1700000, 2650000, 3650000, 5850000],
                        backgroundColor: '#ffc371'
                    }]
                }
            },
            weather: {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Average Temperature (°C)',
                        data: [7, 9, 12, 16, 21, 26, 29, 29, 24, 19, 14, 10],
                        borderColor: '#1a237e'
                    }]
                }
            }
        };

        Object.keys(chartConfig).forEach(chartId => {
            const canvas = document.getElementById(`chart${chartId.charAt(0).toUpperCase() + chartId.slice(1)}`);
            if (canvas) {
                new Chart(canvas.getContext('2d'), {
                    type: chartConfig[chartId].type,
                    data: chartConfig[chartId].data,
                    options: { responsive: true, maintainAspectRatio: false }
                });
            }
        });
    };

    // Form Submission Handling
    document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = e.target.querySelector('button');
        try {
            button.disabled = true;
            button.textContent = 'Sending...';
            await new Promise(resolve => setTimeout(resolve, 1500));
            button.textContent = '✓ Sent!';
            e.target.reset();
        } finally {
            setTimeout(() => {
                button.disabled = false;
                button.textContent = 'Send';
            }, 3000);
        }
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Initialize Slideshow and Charts
    initSlideshow();
    initCharts();

    // Mouse movement effect for hero section
    const hero = document.querySelector('#hero');
    const heroBackground = hero.querySelector('::before'); // pseudo element

    hero.addEventListener('mousemove', (e) => {
        const { width, height } = hero.getBoundingClientRect();
        const offsetX = e.clientX - width / 2;
        const offsetY = e.clientY - height / 2;
        
        // Hareket miktarını sınırlayalım (çok fazla hareket etmesin)
        const moveX = (offsetX / width) * 15; // max 15px
        const moveY = (offsetY / height) * 15; // max 15px

        // CSS custom property ile transform'u güncelle
        hero.style.setProperty('--move-x', `${moveX}px`);
        hero.style.setProperty('--move-y', `${moveY}px`);
    });

    // Mouse'u element üzerinden çekince reset
    hero.addEventListener('mouseleave', () => {
        hero.style.setProperty('--move-x', '0px');
        hero.style.setProperty('--move-y', '0px');
    });

    // Mobile Menu Enhancement
    const initMobileMenu = () => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.main-nav');
        const body = document.body;

        if (mobileMenuBtn && mobileNav) {
            // Toggle menu - Event listener'ı düzeltelim
            mobileMenuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle active class
                this.classList.toggle('active');
                mobileNav.classList.toggle('active');
                
                // Body scroll lock
                if (mobileNav.classList.contains('active')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = '';
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileMenuBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                    body.style.overflow = '';
                }
            });

            // Close menu when clicking on a link
            mobileNav.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                    body.style.overflow = '';
                });
            });
        }
    };

    // DOM yüklendiğinde mobile menu'yü başlat
    document.addEventListener('DOMContentLoaded', initMobileMenu);

    // Read More functionality
    const initReadMore = () => {
        document.querySelectorAll('.read-more-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const slideContent = e.target.closest('.slide-content');
                const contentFull = slideContent.querySelector('.content-full');
                
                // Kapat butonu ekle
                if (!contentFull.querySelector('.close-btn')) {
                    const closeBtn = document.createElement('button');
                    closeBtn.className = 'close-btn';
                    closeBtn.innerHTML = '×';
                    closeBtn.addEventListener('click', () => {
                        slideContent.classList.remove('expanded');
                    });
                    contentFull.insertBefore(closeBtn, contentFull.firstChild);
                }
                
                slideContent.classList.add('expanded');
                
                // ESC tuşu ile kapatma
                const handleEsc = (event) => {
                    if (event.key === 'Escape') {
                        slideContent.classList.remove('expanded');
                        document.removeEventListener('keydown', handleEsc);
                    }
                };
                document.addEventListener('keydown', handleEsc);
                
                // Dışarı tıklama ile kapatma
                const handleOutsideClick = (event) => {
                    if (!contentFull.contains(event.target) && !button.contains(event.target)) {
                        slideContent.classList.remove('expanded');
                        document.removeEventListener('click', handleOutsideClick);
                    }
                };
                setTimeout(() => {
                    document.addEventListener('click', handleOutsideClick);
                }, 0);
            });
        });
    };

    initReadMore();

    // Smooth Scroll Navigation with enhanced animation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Mobil menüyü kapat
                const mobileNav = document.querySelector('.main-nav');
                const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                }

                // Tüm section'ları görünmez yap
                document.querySelectorAll('section').forEach(section => {
                    section.classList.remove('visible');
                });

                // Smooth scroll with callback
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Scroll tamamlandıktan sonra hedef section'ı görünür yap
                setTimeout(() => {
                    targetSection.classList.add('visible');
                }, 300);
            }
        });
    });

    // Initial visibility for sections in viewport
    const observeSection = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observeSection.observe(section);
    });
});

// Responsive Chart Resizing (Eğer grafikler kullanılıyorsa)
window.addEventListener('resize', () => {
    if (Chart.getChart("chartPopulation")) Chart.getChart("chartPopulation").resize();
    if (Chart.getChart("chartPropertyPrices")) Chart.getChart("chartPropertyPrices").resize();
    if (Chart.getChart("chartWeather")) Chart.getChart("chartWeather").resize();
});
