const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');

    menuToggle.setAttribute('aria-expanded', isOpen);

    menuToggle.innerHTML = isOpen ? '&times;': '&#9776;';
});
