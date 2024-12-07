document.addEventListener('DOMContentLoaded', () => {
    const debounce = (func, wait = 200) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Hero Slideshow
    const initHeroSlideshow = () => {
        let images = Array.from(document.querySelectorAll('.hero-image'));
        let currentIndex = 0;
        let interval;

        // Function to shuffle the images array
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
        };

        // Shuffle the images array before starting
        shuffleArray(images);

        // Function to show the next image
        const nextImage = () => {
            images[currentIndex]?.classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex]?.classList.add('active');
        };

        if (images.length > 0) {
            interval = setInterval(nextImage, 2600);

            const slideshow = document.querySelector('.slideshow');
            if (slideshow) {
                slideshow.addEventListener('mouseenter', () => clearInterval(interval));
                slideshow.addEventListener('mouseleave', () => {
                    interval = setInterval(nextImage, 2600);
                });
            }
        }
    };

    // Carousel Functionality
    const initCarousel = () => {
        let slides = Array.from(document.querySelectorAll('.carousel-slide'));
        const indicators = document.querySelectorAll('.indicator');
        const leftArrow = document.getElementById('left-arrow');
        const rightArrow = document.getElementById('right-arrow');
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        let currentSlideIndex = 0;
        let autoSlideInterval;

        // Function to shuffle the slides array
        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
        };

        // Shuffle the slides array before starting
        shuffleArray(slides);

        // Function to display the specified slide
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                indicators[i]?.classList.toggle('active', i === index);
                slide.style.transform = `translateX(${(i - index) * 100}%)`;
            });
        };

        // Move to the next slide
        const nextSlide = () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(currentSlideIndex);
        };

        // Move to the previous slide
        const prevSlide = () => {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            showSlide(currentSlideIndex);
        };

        if (leftArrow && rightArrow && slides.length > 0) {
            // Add click event listeners to arrows
            leftArrow.addEventListener('click', prevSlide);
            rightArrow.addEventListener('click', nextSlide);

            // Add click event listeners to indicators
            indicators.forEach((indicator, i) => {
                indicator.addEventListener('click', () => {
                    currentSlideIndex = i;
                    showSlide(i);
                });
            });

            // Function to start auto-slide
            const startAutoSlide = () => {
                autoSlideInterval = setInterval(nextSlide, 2000);
            };

            // Function to stop auto-slide
            const stopAutoSlide = () => {
                clearInterval(autoSlideInterval);
            };

            // Pause auto-slide on mouse enter and resume on mouse leave
            carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
            carouselWrapper.addEventListener('mouseleave', startAutoSlide);

            // Start auto-sliding and display the initial slide
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



/* Initialize EmailJS with your public key
emailjs.init('BlwRd1dqrTlv2MsVM'); // Replace with your actual public key



// Attach an event listener to handle form submission
// Initialize intl-tel-input
const phoneInputField = document.getElementById('phone');
const iti = window.intlTelInput(phoneInputField, {
    initialCountry: "auto", // Automatically select based on IP
    geoIpLookup: function (callback) {
        fetch('https://ipinfo.io/json', { headers: { 'Accept': 'application/json' } })
            .then(function (resp) { return resp.json(); })
            .then(function (resp) { callback(resp.country); })
            .catch(function () { callback('us'); });
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

// Form submission event listener

// Get the event contact form element
const eventContactForm = document.getElementById('event-contact-form');

eventContactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Validate phone number
    if (!iti.isValidNumber()) {
        alert("Please enter a valid phone number.");
        return;
    }

    // Get the full international phone number
    const phoneNumber = iti.getNumber();

    // Add phone number to the form before submission
    const phoneInput = document.createElement('input');
    phoneInput.setAttribute('type', 'hidden');
    phoneInput.setAttribute('name', 'phone_number');
    phoneInput.setAttribute('value', phoneNumber);
    eventContactForm.appendChild(phoneInput);

    // Send the form data via EmailJS
    emailjs.sendForm('service_5hq3y02', 'template_rwlavle', this)
        .then(function (response) {
            document.getElementById('form-message').innerHTML = 'Message sent successfully! We’ll be in touch soon.';
            document.getElementById('form-message').style.color = '#00A8E8';
            eventContactForm.reset(); // Clear form fields
        }, function (error) {
            document.getElementById('form-message').innerHTML = 'Error sending message: ' + error.text;
            document.getElementById('form-message').style.color = 'red';
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







*/
