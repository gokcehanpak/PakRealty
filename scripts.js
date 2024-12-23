document.addEventListener("DOMContentLoaded", () => {
    // Slideshow for hero section
    const heroSection = document.getElementById('hero');
    const images = ['image1.png', 'image2.png'];
    let currentIndex = 0;

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        heroSection.style.backgroundImage = `url(${images[currentIndex]})`;
    }, 5000);

    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && message) {
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
});
