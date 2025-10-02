export function initScrollAnimations() {
  const sections = {
    services: '.service-card',
    advantages: '.advantage-item, .stat-item, .cta-block',
    testimonials: '.testimonial-card, .testimonials-cta',
    gallery: '.gallery-item, .gallery-filters, .gallery-cta',
    contacts: '.contact-item, .social-links, .contact-map, .appointment-widget',
  }

  Object.values(sections).forEach((selector) => {
    const elements = document.querySelectorAll(selector)
    if (elements.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const computedStyle = window.getComputedStyle(entry.target)
              const animationName = computedStyle.animationName

              if (animationName && animationName !== 'none') {
                entry.target.style.animationPlayState = 'running'
              } else {
                // Если анимация не определена в CSS, добавляем базовую
                entry.target.style.opacity = '1'
                entry.target.style.transform = 'translateY(0)'
              }
            }
          })
        },
        { threshold: 0.1 }
      )

      elements.forEach((element) => observer.observe(element))
    }
  })
}
