document.addEventListener("DOMContentLoaded", () => {
  // Initialize particles
  initParticles()

  // Add interactive effects
  addInteractiveEffects()

  // Add scroll reveal
  addScrollReveal()

  // Add CSS variable for morphing
  const style = document.createElement("style")
  document.head.appendChild(style)

  // Start sequential winking animation
  startSequentialWinking()
})

// Initialize particles canvas
function initParticles() {
  const canvas = document.getElementById("particles-canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas dimensions
  function setCanvasDimensions() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  setCanvasDimensions()
  window.addEventListener("resize", setCanvasDimensions)

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 3 + 1
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      this.color = this.getRandomColor()
      this.opacity = Math.random() * 0.5 + 0.2
    }

    getRandomColor() {
      const colors = [
        "255, 107, 107", // Red
        "79, 172, 254", // Blue
        "67, 233, 123", // Green
        "250, 112, 154", // Pink
        "254, 225, 64", // Yellow
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      // Bounce off edges
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX
      }
      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY
      }
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`
      ctx.fill()

      // Add glow effect
      ctx.shadowBlur = 10
      ctx.shadowColor = `rgba(${this.color}, 0.5)`
    }
  }

  // Create particles
  const particles = []
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    // Connect particles with lines if they're close enough
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1000})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// Add interactive effects to benefit items
function addInteractiveEffects() {
  const benefitItems = document.querySelectorAll(".benefit-item")

  benefitItems.forEach((item) => {
    // Mouse enter effect
    item.addEventListener("mouseenter", () => {
      // Add glow effect to the ::after element
      item.style.zIndex = "10"
    })

    // Mouse leave effect
    item.addEventListener("mouseleave", () => {
      item.style.zIndex = "5"
    })

    // Mouse move parallax effect
    item.addEventListener("mousemove", (e) => {
      const content = item.querySelector(".benefit-content")
      const rect = item.getBoundingClientRect()

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const moveX = (x - centerX) / 20
      const moveY = (y - centerY) / 20

      content.style.transform = `translate(${moveX}px, ${moveY}px)`
    })

    // Reset on mouse leave
    item.addEventListener("mouseleave", () => {
      const content = item.querySelector(".benefit-content")
      content.style.transform = ""
    })
  })

  // Add magnetic effect to icons
  document.querySelectorAll(".icon-container").forEach((icon) => {
    icon.addEventListener("mousemove", (e) => {
      const rect = icon.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const deltaX = (x - centerX) / 5
      const deltaY = (y - centerY) / 5

      icon.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.2)`
    })

    icon.addEventListener("mouseleave", () => {
      icon.style.transform = ""
    })
  })
}

// Add scroll reveal animation
function addScrollReveal() {
  const benefits = document.querySelector(".benefits")
  const benefitItems = document.querySelectorAll(".benefit-item")

  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
  }

  // Function to handle scroll
  function handleScroll() {
    if (isInViewport(benefits)) {
      benefits.classList.add("active")

      // Add reveal animation to each benefit item
      benefitItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("reveal")
        }, 300 * index)
      })

      // Remove scroll listener once revealed
      window.removeEventListener("scroll", handleScroll)
    }
  }

  // Add scroll listener
  window.addEventListener("scroll", handleScroll)

  // Check on initial load
  handleScroll()

  // Add CSS for reveal animation
  const style = document.createElement("style")
  style.textContent = `
    .benefit-item {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .benefit-item.reveal {
      opacity: 1;
      transform: translateY(0);
    }
  `
  document.head.appendChild(style)
}

// Sequential winking animation
function startSequentialWinking() {
  const benefitItems = document.querySelectorAll(".benefit-item")
  let currentIndex = 0

  // Function to add wink class to current item
  function winkCurrentItem() {
    // Remove wink class from all items
    benefitItems.forEach((item) => {
      item.classList.remove("wink")
    })

    // Add wink class to current item
    benefitItems[currentIndex].classList.add("wink")

    // Increment index and loop back to 0 if needed
    currentIndex = (currentIndex + 1) % benefitItems.length

    // Schedule next wink
    setTimeout(winkCurrentItem, 2000) // Wink every 3 seconds
  }

  // Start the sequence after a short delay
  setTimeout(winkCurrentItem, 1000)
}
