document.addEventListener('DOMContentLoaded', () => {
    // Utility Functions
    const debounce = (func, wait = 200) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Hamburger Menu Functionality
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-btn');
    const menuLinks = document.querySelectorAll('.mobile-menu nav a');

    const toggleMenu = () => {
        const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
        hamburgerMenu.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('show');
        mobileMenu.setAttribute('aria-hidden', isExpanded);
    };

    if (hamburgerMenu && mobileMenu && closeBtn) {
        hamburgerMenu.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);

        // Close menu when clicking on a menu item
        menuLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });

        // Close mobile menu when clicking outside links or close button
        mobileMenu.addEventListener('click', (event) => {
            const target = event.target;
            if (
                mobileMenu.classList.contains('show') &&
                target !== hamburgerMenu &&
                target !== closeBtn &&
                !target.closest('.mobile-menu nav a')
            ) {
                toggleMenu();
            }
        });
    }

    // Hero Slideshow
    const initHeroSlideshow = () => {
        const images = document.querySelectorAll('.hero-image');
        let currentIndex = 0;
        let interval;

        const nextImage = () => {
            images[currentIndex]?.classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex]?.classList.add('active');
        };

        if (images.length > 0) {
            interval = setInterval(nextImage, 3000);

            const slideshow = document.querySelector('.slideshow');
            if (slideshow) {
                slideshow.addEventListener('mouseenter', () => clearInterval(interval));
                slideshow.addEventListener('mouseleave', () => {
                    interval = setInterval(nextImage, 3000);
                });
            }
        }
    };

    // Carousel Functionality
    const initCarousel = () => {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const leftArrow = document.getElementById('left-arrow');
        const rightArrow = document.getElementById('right-arrow');
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        let currentSlideIndex = 0;
        let autoSlideInterval;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                indicators[i]?.classList.toggle('active', i === index);
                slide.style.transform = `translateX(${(i - index) * 100}%)`;
            });
        };

        const nextSlide = () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(currentSlideIndex);
        };

        const prevSlide = () => {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            showSlide(currentSlideIndex);
        };

        if (leftArrow && rightArrow && slides.length > 0) {
            leftArrow.addEventListener('click', prevSlide);
            rightArrow.addEventListener('click', nextSlide);

            indicators.forEach((indicator, i) => {
                indicator.addEventListener('click', () => {
                    currentSlideIndex = i;
                    showSlide(i);
                });
            });

            const startAutoSlide = () => {
                autoSlideInterval = setInterval(nextSlide, 3000);
            };

            const stopAutoSlide = () => {
                clearInterval(autoSlideInterval);
            };

            carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
            carouselWrapper.addEventListener('mouseleave', startAutoSlide);

            startAutoSlide();
            showSlide(currentSlideIndex);
        }
    };

    // Swiper Initialization
    const initializeSwiper = () => {
        const swiperContainers = document.querySelectorAll('.swiper-container');

        swiperContainers.forEach(container => {
            const swiperInstance = container.swiper;
            if (swiperInstance) swiperInstance.destroy(true, true);

            const isMobilePortrait = window.innerWidth <= 480;
            const swiperOptions = {
                loop: true,
                centeredSlides: container.classList.contains('testimonials-swiper') ? true : false,
                pagination: {
                    el: container.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: container.querySelector('.swiper-button-next'),
                    prevEl: container.querySelector('.swiper-button-prev'),
                },
                slidesPerView: 1,
                spaceBetween: 30,
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                },
                autoplay: {
                    delay: isMobilePortrait ? 3000 : 1500,
                    disableOnInteraction: false,
                },
                effect: isMobilePortrait ? 'fade' : 'slide',
                fadeEffect: {
                    crossFade: true,
                },
                scrollbar: {
                    el: null,
                    hide: true,
                },
            };

            new Swiper(container, swiperOptions);
        });
    };

    // Intersection Observer for Fade-In Effects
    const initFadeInObservers = () => {
        const fadeContents = document.querySelectorAll('.fade-content');
        if (fadeContents.length === 0) return;

        const observerOptions = {
            threshold: 0.2,
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        fadeContents.forEach(element => observer.observe(element));
    };

    // Modal Functionality
    const initModals = () => {
        const pillars = document.querySelectorAll('.pillar');
        const modals = document.querySelectorAll('.modal');

        const openModal = (modalId) => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
            }
        };

        const closeModal = (modal) => {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        };

        pillars.forEach(pillar => {
            pillar.addEventListener('click', () => {
                const modalId = pillar.dataset.modalTarget;
                openModal(modalId);
            });
        });

        modals.forEach(modal => {
            const closeBtn = modal.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => closeModal(modal));
            }

            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeModal(modal);
                }
            });
        });
    };

    // Disable Right-Click on Videos
    const disableVideoContextMenu = () => {
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName.toLowerCase() === 'video') {
                e.preventDefault();
            }
        });
    };

    // Initialize All Functions
    initHeroSlideshow();
    initCarousel();
    initializeSwiper();
    initFadeInObservers();
    initModals();
    disableVideoContextMenu();

    // Handle Swiper Re-initialization on Resize with Debouncing
    window.addEventListener('resize', debounce(() => {
        initializeSwiper();
    }, 300));
});



// Select all anchor elements inside the navigation
const navLinks = document.querySelectorAll('.nav-links a');

// Add event listeners to each nav link
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Remove 'active' class from all links
        navLinks.forEach(nav => nav.classList.remove('active'));

        // Add 'active' class to the clicked link
        this.classList.add('active');
    });
});
















mapboxgl.accessToken = 'pk.eyJ1IjoiZmF3YXpiZWxsbyIsImEiOiJjbHhxcnV4djQwbXVtMmtxd2dlaDM1ZnMyIn0.aOIVUyZLSwLMNN0QRZCyuQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', // Style URL
    center: [0.3074, 51.4487], // Longitude, Latitude
    zoom: 15
});

new mapboxgl.Marker()
    .setLngLat([0.3074, 51.4487])
    .addTo(map);



// JavaScript for the contact form (example using EmailJS)

// Replace with your EmailJS service ID and template ID
emailjs.init("YOUR_PUBLIC_KEY");

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function (response) {
            alert('Message sent successfully!');
            contactForm.reset(); // Clear the form fields
        }, function (error) {
            alert('Error sending message: ' + error);
        });
});
























































// Scroll to Top Button
document.addEventListener('DOMContentLoaded', function () {
    const scrollUpBtn = document.getElementById('scrollUpBtn');

    // Show the button when scrolled down 100px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollUpBtn.classList.add('show');
        } else {
            scrollUpBtn.classList.remove('show');
        }
    });

    // Scroll to the top when the button is clicked
    scrollUpBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});








