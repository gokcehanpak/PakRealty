document.addEventListener("DOMContentLoaded", () => {
    // Parallax scrolling effect for the local area section
    const localAreaSection = document.getElementById('local-area');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        localAreaSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Interactive charts using Chart.js library
    const chartData = {
        population: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Population',
                data: [121493, 125812, 130835, 133177, 136124],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        propertyPrices: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Average Property Prices',
                data: [750000, 1700000, 2650000, 3650000, 5850000],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        weather: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Average Temperature (°C)',
                data: [7, 9, 12, 16, 21, 26, 29, 29, 24, 19, 14, 10],
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        }
    };

    const ctxPopulation = document.getElementById('chartPopulation').getContext('2d');
    const ctxPropertyPrices = document.getElementById('chartPropertyPrices').getContext('2d');
    const ctxWeather = document.getElementById('chartWeather').getContext('2d');

    new Chart(ctxPopulation, {
        type: 'line',
        data: chartData.population,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(ctxPropertyPrices, {
        type: 'bar',
        data: chartData.propertyPrices,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(ctxWeather, {
        type: 'line',
        data: chartData.weather,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Hide header when scrolling to About Us section
    const header = document.querySelector('header');
    const aboutSection = document.getElementById('about');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const aboutSectionTop = aboutSection.getBoundingClientRect().top;
        const scrollPosition = window.scrollY + window.innerHeight;
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollPosition >= aboutSectionTop && currentScrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.add('hidden');
        } else if (currentScrollTop < lastScrollTop) {
            // Scrolling up
            header.classList.remove('hidden');
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
    });

    // Slideshow functionality
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");
    const showSlide = (index) => {
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        slides[index].classList.add("active");
    };

    const nextSlide = () => {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    };

    const prevSlide = () => {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    };

    document.querySelector(".next").addEventListener("click", nextSlide);
    document.querySelector(".prev").addEventListener("click", prevSlide);

    let slideInterval = setInterval(nextSlide, 5000);

    for (let slide of slides) {
        slide.addEventListener("mouseenter", () => clearInterval(slideInterval));
        slide.addEventListener("mouseleave", () => slideInterval = setInterval(nextSlide, 5000));
    }

    showSlide(slideIndex);
});
