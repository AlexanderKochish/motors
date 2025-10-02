class TestimonialsSlider {
  constructor() {
    this.track = document.querySelector('.testimonials-track')
    this.cards = document.querySelectorAll('.testimonial-card')
    this.prevBtn = document.querySelector('.prev-btn')
    this.nextBtn = document.querySelector('.next-btn')
    this.dotsContainer = document.querySelector('.slider-dots')

    if (this.track && this.cards.length > 0) {
      this.currentIndex = 0
      this.cardWidth = this.cards[0].offsetWidth + 32
      this.init()
    }
  }

  init() {
    this.createDots()

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev())
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next())
    }

    window.addEventListener('resize', () => {
      if (this.cards[0]) {
        this.cardWidth = this.cards[0].offsetWidth + 32
        this.updateSlider()
      }
    })
  }

  createDots() {
    if (!this.dotsContainer) return

    this.dotsContainer.innerHTML = ''
    const visibleCards = this.getVisibleCards()
    const dotCount = Math.max(this.cards.length - visibleCards + 1, 1)

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div')
      dot.className = 'slider-dot'
      if (i === 0) dot.classList.add('active')
      dot.addEventListener('click', () => this.goToSlide(i))
      this.dotsContainer.appendChild(dot)
    }
  }

  updateSlider() {
    if (!this.track) return

    const offset = -this.currentIndex * this.cardWidth
    this.track.style.transform = `translateX(${offset}px)`

    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex)
    })
  }

  next() {
    const maxIndex = this.cards.length - this.getVisibleCards()
    if (this.currentIndex < maxIndex) {
      this.currentIndex++
      this.updateSlider()
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--
      this.updateSlider()
    }
  }

  goToSlide(index) {
    this.currentIndex = index
    this.updateSlider()
  }

  getVisibleCards() {
    if (window.innerWidth <= 768) return 1
    if (window.innerWidth <= 1024) return 2
    return 3
  }
}

export const testimonialsSlider = new TestimonialsSlider()
