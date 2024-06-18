
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('hamburger-menu').addEventListener('click', () => {
        document.getElementById('mobile-menu').style.display = 'block';
    });

    document.getElementById('close-btn').addEventListener('click', () => {
        document.getElementById('mobile-menu').style.display = 'none';
    });

});


document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const carousel = document.querySelector('.carousel');
    let currentIndex = 0;
    let startX, endX;
    let autoSlideInterval;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            indicators[i].classList.remove('active');
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
            if (i === index) {
                slide.classList.add('active');
                indicators[i].classList.add('active');
            }
        });
    };

    const goToNextSlide = () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        showSlide(currentIndex);
    };

    const goToPrevSlide = () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        showSlide(currentIndex);
    };

    document.getElementById('left-arrow').addEventListener('click', () => {
        goToPrevSlide();
        resetAutoSlide();
    });
    document.getElementById('right-arrow').addEventListener('click', () => {
        goToNextSlide();
        resetAutoSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            currentIndex = index;
            resetAutoSlide();
        });
    });

    const handleTouchStart = (event) => {
        startX = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
        endX = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (startX > endX + 50) {
            goToNextSlide();
            resetAutoSlide();
        } else if (startX < endX - 50) {
            goToPrevSlide();
            resetAutoSlide();
        }
    };

    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchmove', handleTouchMove);
    carousel.addEventListener('touchend', handleTouchEnd);

    // Auto slide show functionality
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(goToNextSlide, 3000); // Change slides every 3 seconds
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    startAutoSlide(); // Start the auto slide show initially

    // Initial display of the first slide
    showSlide(currentIndex);

    // Transition effect for slides
    slides.forEach(slide => {
        slide.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    });
});





document.addEventListener('DOMContentLoaded', function () {
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

        var swiper = new Swiper('.swiper-container', swiperOptions);

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






























/*document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('commentForm');
    const commentsSection = document.getElementById('commentsSection');

    commentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('commentName').value;
        const text = document.getElementById('commentText').value;

        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');

        const commentName = document.createElement('h4');
        commentName.textContent = name;

        const commentText = document.createElement('p');
        commentText.textContent = text;

        commentDiv.appendChild(commentName);
        commentDiv.appendChild(commentText);

        commentsSection.appendChild(commentDiv);

        // Clear the form
        commentForm.reset();
    });
});
*/







