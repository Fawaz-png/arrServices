
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
    const panView = document.getElementById('carousel-pan-view');
    const panImage = document.getElementById('carousel-pan-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let currentIndex = 0;
    let startX, endX;

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

    document.getElementById('left-arrow').addEventListener('click', goToPrevSlide);
    document.getElementById('right-arrow').addEventListener('click', goToNextSlide);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            currentIndex = index;
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
        } else if (startX < endX - 50) {
            goToPrevSlide();
        }
    };

    document.querySelector('.carousel').addEventListener('touchstart', handleTouchStart);
    document.querySelector('.carousel').addEventListener('touchmove', handleTouchMove);
    document.querySelector('.carousel').addEventListener('touchend', handleTouchEnd);
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







