const slides = document.querySelectorAll('.carousel-slide');
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');

let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    slides[index].classList.add('active');
}

nextButton.addEventListener('click', function () {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
});

prevButton.addEventListener('click', function () {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slides.length -1;
    }
    showSlide(currentSlide);
});