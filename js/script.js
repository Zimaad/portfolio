// Typed.js effect
var typed = new Typed('#typed', {
    strings: ["Data Science Enthusiast", "Web Developer", "AI Learner"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// AOS Init
AOS.init({
    duration: 1000,
    once: true
});

// Particles.js Init
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00aaff" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        line_linked: { enable: true, color: "#00aaff", opacity: 0.4 },
        move: { enable: true, speed: 2 }
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: "repulse" }
        }
    },
    retina_detect: true
});
