document.addEventListener("DOMContentLoaded", () => {
    const dropDownBtn = document.getElementById('dropdown-btn');
    const dropDownContent = document.getElementById('dropdown-content');
    let isOpen = false;

    dropDownBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        if (isOpen) {
            // Animate back to stacked form and hide
            const items = dropDownContent.querySelectorAll('a');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(0)';
                    item.style.opacity = '0';
                }, index * 100);
            });
            setTimeout(() => {
                dropDownContent.style.display = 'none';
            }, items.length * 100);
        } else {
            // Show and animate to original position
            dropDownContent.style.display = 'flex';
            dropDownContent.classList.add('stacked');
            const items = dropDownContent.querySelectorAll('a');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = `translateY(${index * 40}px)`;
                    item.style.opacity = '1';
                }, index * 100);
            });
        }
        isOpen = !isOpen;
    });

    const menuItems = dropDownContent.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            dropDownBtn.textContent = item.textContent;
            dropDownContent.querySelectorAll('a').forEach(anchor => {
                anchor.style.transform = 'translateY(0)';
                anchor.style.opacity = '0';
            });
            setTimeout(() => {
                dropDownContent.style.display = 'none';
            }, menuItems.length * 100);
            isOpen = false;
        });
    });
});
