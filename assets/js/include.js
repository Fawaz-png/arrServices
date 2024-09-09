document.addEventListener('DOMContentLoaded', function () {
    // Detect current path and set base URL for header and footer inclusion
    const isInSubfolder = window.location.pathname.includes('/pages/');
    const basePath = isInSubfolder ? '../includes/' : 'includes/';

    // Load header dynamically
    fetch(`${basePath}header.html`)
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;

            // After header is loaded, set active link based on current URL
            setActiveLink();
            addMobileMenuFunctionality();
        });

    // Load footer dynamically
    fetch(`${basePath}footer.html`)
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        });

    // Function to set the active class for the current page
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const desktopLinks = document.querySelectorAll('.nav-links a');
        const mobileLinks = document.querySelectorAll('.mobile-menu nav a');

        // Helper function to match the active link
        const matchLink = (links) => {
            links.forEach(link => {
                const linkPath = new URL(link.href).pathname;
                if (linkPath === currentPath) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        };

        // Match the active link in both desktop and mobile menus
        matchLink(desktopLinks);
        matchLink(mobileLinks);
    }

    // Function to handle mobile menu functionality
    function addMobileMenuFunctionality() {
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

            menuLinks.forEach(link => {
                link.addEventListener('click', toggleMenu);
            });

            mobileMenu.addEventListener('click', (event) => {
                const target = event.target;
                if (
                    mobileMenu.classList.contains('show') &&
                    !target.closest('.mobile-menu nav a') &&
                    target !== hamburgerMenu &&
                    target !== closeBtn
                ) {
                    toggleMenu();
                }
            });
        }
    }

})
