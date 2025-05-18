document.addEventListener("DOMContentLoaded", () => {
  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
  }

  // Get all elements that need to be animated
  const blocks = document.querySelectorAll(".about-block-custom")
  const imageSection = document.querySelector(".about-image-section-custom")

  // Function to handle scroll animation
  function handleScrollAnimation() {
    // Animate blocks when they come into view
    blocks.forEach((block) => {
      if (isInViewport(block) && !block.classList.contains("animate-in")) {
        block.classList.add("animate-in")
      }
    })

    // Animate image section when it comes into view
    if (imageSection && isInViewport(imageSection) && !imageSection.classList.contains("animate-in")) {
      imageSection.classList.add("animate-in")
    }
  }

  // Run once on load to check for elements already in viewport
  handleScrollAnimation()

  // Add scroll event listener
  window.addEventListener("scroll", handleScrollAnimation)

  // Optional: Add hover effect for central axis
  const centralAxis = document.querySelector(".about-central-axis-custom")
  if (centralAxis) {
    centralAxis.addEventListener("mouseenter", function () {
      this.style.width = "6px"
      this.style.transition = "width 0.3s ease"
    })

    centralAxis.addEventListener("mouseleave", function () {
      this.style.width = "4px"
      this.style.transition = "width 0.3s ease"
    })
  }

  // Optional: Add pulse animation to connector dots
  const connectors = document.querySelectorAll(".about-connector-custom")
  connectors.forEach((connector) => {
    connector.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
    })

    connector.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
    })
  })

})

// Add this to your CSS if you want to use the pulse animation
document.head.insertAdjacentHTML(
  "beforeend",
  `
  <style>
    @keyframes pulse {
      0% {
        transform: translateY(-50%) scale(1);
        opacity: 1;
      }
      50% {
        transform: translateY(-50%) scale(1.2);
        opacity: 0.7;
      }
      100% {
        transform: translateY(-50%) scale(1);
        opacity: 1;
      }
    }
  </style>
`,
)
