

// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Navbar background effect on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.style.background = window.scrollY > 50
    ? 'rgba(0, 0, 0, 0.9)'
    : 'rgba(0, 0, 0, 0.8)';
});
