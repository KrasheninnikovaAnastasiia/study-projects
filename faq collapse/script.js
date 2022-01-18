const toggles = document.querySelectorAll('.faq-toggle');

toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.classList.add('active');
        toggle.parentNode.classList.toggle('active');
    });
});