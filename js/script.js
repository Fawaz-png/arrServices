//Navbar Functionality

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-btn');
    const menuLinks = document.querySelectorAll('.mobile-menu nav a');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('show');
        if (mobileMenu.classList.contains('show')) {
            setTimeout(() => {
                mobileMenu.style.overflowY = 'auto';
            }, 300); // Match the transition duration
        } else {
            mobileMenu.style.overflowY = 'hidden';
        }
    };

    hamburgerMenu.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking on a menu item
    menuLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Close mobile menu when clicking *inside* it, but not on links or the close button
    mobileMenu.addEventListener('click', (event) => {
        const target = event.target;
        const isLink = target.tagName === 'A';
        const isCloseBtn = target.classList.contains('close-btn');

        if (mobileMenu.classList.contains('show') && !isLink && !isCloseBtn) {
            toggleMenu();
        }
    });
});



//Hero Slideshow
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.hero-image');
    let currentIndex = 0;
    let interval;

    function nextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    interval = setInterval(nextImage, 3000); // Start the slideshow

    // Pause slideshow on hover
    const slideshow = document.querySelector('.slideshow');
    slideshow.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });

    slideshow.addEventListener('mouseleave', () => {
        interval = setInterval(nextImage, 3000); // Restart slideshow on mouseleave
    });
});


//Carousel Functionality
document.addEventListener("DOMContentLoaded", () => {
    // Carousel Functionality
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlideIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            indicators[i].classList.remove('active');
            slide.style.transform = `translateX(${(i - index) * 100}%)`; // Move the slides horizontally
            if (i === index) {
                slide.classList.add('active');
                indicators[i].classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }

    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        showSlide(currentSlideIndex);
    }

    document.getElementById('left-arrow').addEventListener('click', prevSlide);
    document.getElementById('right-arrow').addEventListener('click', nextSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlideIndex = index;
            showSlide(currentSlideIndex);
            resetAutoSlide(); // Reset auto-slide after manual interaction
        });
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000); // Auto-slide every 3 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Start auto-slide initially
    startAutoSlide();

    // Initial display
    showSlide(currentSlideIndex);

    // Fade-in Effect for the Section
    const aboutSection = document.querySelector('.about-us');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
        });
    });

    observer.observe(aboutSection);
});





document.addEventListener('DOMContentLoaded', function () {
    // Initialize Swiper
    function initializeSwiper() {
        var swiperOptions = {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
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
            touchStartPreventDefault: false,
            scrollbar: {
                el: null,
                hide: true,
            },
        };

        // Check if the viewport width is 480px or less (mobile portrait view)
        if (window.innerWidth <= 480) {
            swiperOptions.autoplay = {
                delay: 3000,
                disableOnInteraction: false,
            };
            swiperOptions.speed = 1000;
            swiperOptions.effect = 'fade';
            swiperOptions.fadeEffect = {
                crossFade: true,
            };
        }

        var swiper = new Swiper('.services-swiper', swiperOptions);

        if (window.innerWidth <= 480) {
            let autoplayDelay = swiperOptions.autoplay.delay;
            let autoplayTimeout;

            swiper.el.addEventListener('touchstart', function () {
                swiper.autoplay.stop();
                clearTimeout(autoplayTimeout);
            });

            swiper.el.addEventListener('touchend', function () {
                clearTimeout(autoplayTimeout);
                autoplayTimeout = setTimeout(function () {
                    swiper.autoplay.start();
                }, autoplayDelay);
            });

            swiper.el.addEventListener('mousedown', function () {
                swiper.autoplay.stop();
                clearTimeout(autoplayTimeout);
            });

            swiper.el.addEventListener('mouseup', function () {
                clearTimeout(autoplayTimeout);
                autoplayTimeout = setTimeout(function () {
                    swiper.autoplay.start();
                }, autoplayDelay);
            });
        }

        // Re-initialize Swiper on window resize
        window.addEventListener('resize', function () {
            swiper.destroy(true, true);
            initializeSwiper();
        });
    }

    // Initialize Swiper on DOMContentLoaded
    initializeSwiper();
});

// IntersectionObserver for fade-in effect
document.addEventListener('DOMContentLoaded', function () {
    const fadeContents = document.querySelectorAll('.fade-content');

    const observerOptions = {
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            } else {
                entry.target.classList.remove('fade-in');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeContents.forEach(content => {
        observer.observe(content);
    });
});



document.addEventListener('DOMContentLoaded', function () {
    // Modal Functionality
    const pillars = document.querySelectorAll('.pillar');
    const modals = document.querySelectorAll('.modal');

    pillars.forEach(pillar => {
        pillar.addEventListener('click', () => {
            const modalId = pillar.dataset.modalTarget;
            openModal(modalId);
        });
    });

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
    }

    // Intersection Observer for Fade-In Effect
    const fadeElements = document.querySelectorAll('.fade-content');

    const observerOptions = {
        threshold: 0.2
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('fade-in')) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const initializeSwiper = () => {
        const swiperOptions = {
            loop: true,
            centeredSlides: true, // Center slides
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 3, // Show 3 slides at a time on large screens
            spaceBetween: 30,
            breakpoints: {
                0: { // Mobile devices (portrait and landscape)
                    slidesPerView: 1, // Show 1 slide at a time
                    spaceBetween: 10, // Reduce space between slides
                },
                768: { // Tablets (portrait and landscape)
                    slidesPerView: 2, // Show 2 slides at a time
                    spaceBetween: 20,
                },
                1024: { // Larger screens
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
            touchStartPreventDefault: false, // Prevent default touch behavior
            scrollbar: {
                el: null,
                hide: true,
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        };

        // Initialize Swiper
        new Swiper('.testimonials-swiper', swiperOptions);
    };

    // Initial Swiper setup
    initializeSwiper();

    // Re-initialize Swiper on window resize
    window.addEventListener('resize', () => {
        const existingSwiper = document.querySelector('.testimonials-swiper').swiper;
        if (existingSwiper) {
            existingSwiper.destroy(true, true);
        }
        initializeSwiper();
    });

    // Intersection Observer for fade-in effect
    const fadeContents = document.querySelectorAll('.fade-content');
    const observerOptions = {
        threshold: 0.2,
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('fade-in')) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeContents.forEach(element => {
        observer.observe(element);
    });
});





// Disable Right-Click on Videos
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'VIDEO') {
        e.preventDefault(); 
    }
});











// JavaScript for the fade-in effect
document.addEventListener('DOMContentLoaded', function () {
    const fadeContents = document.querySelectorAll('.fade-content');

    const observerOptions = {
        threshold: 0.2
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('fade-in')) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeContents.forEach(content => {
        observer.observe(content);
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








