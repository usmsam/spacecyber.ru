document.addEventListener("DOMContentLoaded", function () {
  // Preloader
  const preloader = document.querySelector(".preloader");

  window.addEventListener("load", function () {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  });

  // Initialize particles.js
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#6c5ce7" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#6c5ce7", opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2, direction: "none" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" }
        }
      }
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    menuToggle.querySelector("i").classList.toggle("fa-times");
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      menuToggle.querySelector("i").classList.remove("fa-times");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });

  // Back to top button
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  });

  // Tab functionality
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Remove active class from all buttons and contents
      tabBtns.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Hero Section Slider
  function initHeroSlider() {
    const slides = document.querySelectorAll(".bg-slide");
    const rotatingText = document.querySelector(".rotating-text");
    const words = rotatingText.getAttribute("data-words").split(",");
    let currentIndex = 0;
    const colors = ['#6c5ce7', '#fdcb6e', '#d63031'];

    // Initial setup
    slides[0].classList.add("active");
    rotatingText.textContent = words[0];
    rotatingText.style.color = colors[0];

    function changeSlide() {
      // Remove active class from current slide
      slides[currentIndex].classList.remove("active");
      
      // Fade out text
      rotatingText.classList.add("fade-out");
      
      setTimeout(() => {
        // Update index
        currentIndex = (currentIndex + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentIndex].classList.add("active");
        
        // Update text and color
        rotatingText.textContent = words[currentIndex];
        rotatingText.style.color = colors[currentIndex];
        
        // Remove fade-out class to trigger fade-in
        rotatingText.classList.remove("fade-out");
      }, 500); // Match this with CSS transition time
    }

    // Start the slider
    setInterval(changeSlide, 5000);
  }

  // Initialize hero slider
  if (document.querySelector(".hero")) {
    initHeroSlider();
  }

  // Animate elements when they come into view
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".benefit-card, .service-card, .why-card, .blog-card"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for animated elements
  document
    .querySelectorAll(".benefit-card, .service-card, .why-card, .blog-card")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(50px)";
      element.style.transition = "all 0.6s ease";
    });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on load

  // Benefit cards animation
  const benefitCards = document.querySelectorAll('.benefit-card');
  
  function animateBenefitCards() {
    benefitCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
      
      if (isVisible) {
        // Четные карточки - сверху, нечетные - снизу
        if (index % 2 === 0) {
          card.classList.add('animate-top');
        } else {
          card.classList.add('animate-bottom');
        }
      }
    });
  }
  
  // Запускаем при загрузке
  animateBenefitCards();
  
  // И при скролле
  window.addEventListener('scroll', animateBenefitCards);

  // About section animation
  function animateAboutSection() {
    const aboutSection = document.querySelector('.about');
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (aboutPosition < screenPosition) {
      aboutSection.classList.add('animated');
    }
  }

  // Запускаем при загрузке
  animateAboutSection();

  // И при скролле
  window.addEventListener('scroll', animateAboutSection);

  // Form submission
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      // Here you would typically send the data to a server
      console.log("Form submitted:", data);

      // Show success message
      alert("Thank you for your message! We will get back to you soon.");
      this.reset();
    });
  }

  // About card flip animation
  const aboutCard = document.querySelector(".about-card");
  if (aboutCard) {
    aboutCard.addEventListener("click", function () {
      this.classList.toggle("flipped");
    });
  }
});

// Scroll reveal animations
const scrollReveal = ScrollReveal({
  origin: "bottom",
  distance: "60px",
  duration: 1000,
  delay: 200,
  reset: false,
  viewFactor: 0.2
});

// Hero section
scrollReveal.reveal(".hero-content", {
  delay: 300,
  distance: "100px",
  origin: "left"
});

// Other sections
scrollReveal.reveal(".section-header", {
  delay: 200,
  distance: "60px"
});

scrollReveal.reveal(".benefit-card, .service-card, .why-card, .blog-card", {
  interval: 150
});

scrollReveal.reveal(".about-image, .about-content", {
  interval: 200,
  distance: "100px"
});

scrollReveal.reveal(".tab-content", {
  distance: "100px",
  origin: "right"
});

scrollReveal.reveal(".contact-content, .contact-info", {
  interval: 200,
  distance: "100px"
});

document.addEventListener('DOMContentLoaded', function() {
  // Улучшенный эффект zoom для изображений
  const tabImages = document.querySelectorAll('.tab-image');
  
  tabImages.forEach(container => {
    const img = container.querySelector('img');
    
    // Для плавного эффекта при загрузке
    img.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Альтернативный вариант, если CSS не работает
    container.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.08)';
    });
    
    container.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });
  });
});