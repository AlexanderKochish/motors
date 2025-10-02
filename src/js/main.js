import { galleryFilter } from './gallery/gallery'
import { headerManager } from './header/header'
import { preloadCriticalImages } from './helpers/preloadCriticalImages'
import { animateCounters } from './initScrollAnimations/animateCounters'
import { initScrollAnimations } from './initScrollAnimations/initScrollAnimations'
import { modalManager } from './modal/modal'
import { testimonialsSlider } from './testimonials/testimonials'

document.addEventListener('DOMContentLoaded', function () {
  if (headerManager && headerManager.init) headerManager.init()
  if (testimonialsSlider && testimonialsSlider.init) testimonialsSlider.init()
  if (modalManager && modalManager.init) modalManager.init()
  if (galleryFilter && galleryFilter.init) galleryFilter.init()

  const appointmentForm = document.querySelector(
    '.contacts-section .appointment-form'
  )
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
      e.preventDefault()
      modalManager.showSuccessMessage()
    })
  }

  // Запуск анимации счетчиков при скролле
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )

  const advantagesStats = document.querySelector('.advantages-stats')
  if (advantagesStats) {
    statsObserver.observe(advantagesStats)
  }

  initScrollAnimations()

  // Обработчики форм и кнопок
  // const appointmentForm = document.querySelector('.appointment-form');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
      e.preventDefault()
      alert('Спасибо! Мы скоро вам перезвоним для подтверждения записи.')
      this.reset()
    })
  }

  const mapBtn = document.querySelector('.map-btn')
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      const shortMapsUrl = 'https://maps.app.goo.gl/F3yLZFsCHpepi9JZ9'

      window.open(shortMapsUrl, '_blank')
    })
  }
  // Маска для телефона
  const phoneInput = document.querySelector('input[type="tel"]')
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let x = e.target.value
        .replace(/\D/g, '')
        .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
      e.target.value =
        '+3' +
        (x[2] ? ' (' + x[2] : '') +
        (x[3] ? ') ' + x[3] : '') +
        (x[4] ? '-' + x[4] : '') +
        (x[5] ? '-' + x[5] : '')
    })
  }

  // Плавная прокрутка для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    })
  })
})

window.addEventListener('resize', () => {
  const navMenu = document.querySelector('.nav-menu')
  const navToggle = document.querySelector('.nav-toggle')

  if (window.innerWidth > 768) {
    navMenu.classList.remove('active')
    navToggle.classList.remove('active')
  }
})

// Оптимизация для мобильных устройств
if ('ontouchstart' in window) {
  document.documentElement.classList.add('touch-device')
}

preloadCriticalImages()

// Инициализация при полной загрузке страницы
window.addEventListener('load', function () {
  document.body.classList.add('loaded')
})
