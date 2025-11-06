let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

function showSlide(index) {
  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;

  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  slides[slideIndex].classList.add("active");
  dots[slideIndex].classList.add("active");
}

// Next/Prev Buttons
nextBtn.addEventListener("click", () => {
  slideIndex++;
  showSlide(slideIndex);
});

prevBtn.addEventListener("click", () => {
  slideIndex--;
  showSlide(slideIndex);
});

// Dots Click
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    slideIndex = i;
    showSlide(slideIndex);
  });
});

// Auto-play every 3 seconds
setInterval(() => {
  slideIndex++;
  showSlide(slideIndex);
}, 3000);

// Initialize first slide
showSlide(slideIndex);
