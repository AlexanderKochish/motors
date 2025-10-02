import { galleryFilter } from './gallery/gallery'
import { headerManager } from './header/header'
import { preloadCriticalImages } from './helpers/preloadCriticalImages'
import { hubspotService } from './hubspot/hubspot'
import { animateCounters } from './initScrollAnimations/animateCounters'
import { initScrollAnimations } from './initScrollAnimations/initScrollAnimations'
import { modalManager } from './modal/modal'
import { testimonialsSlider } from './testimonials/testimonials'

document.addEventListener('DOMContentLoaded', function () {
  // Инициализация менеджеров
  if (headerManager && headerManager.init) headerManager.init()
  if (testimonialsSlider && testimonialsSlider.init) testimonialsSlider.init()
  if (modalManager && modalManager.init) modalManager.init()
  if (galleryFilter && galleryFilter.init) galleryFilter.init()

  // Общая функция обработки форм
  const handleFormSubmit = async (form, formType = 'main') => {
    // Собираем данные формы
    const formData = {
      firstname: form.querySelector('input[type="text"]')?.value,
      phone: form.querySelector('input[type="tel"]')?.value,
      service_type: form.querySelector('select')?.value,
      message: form.querySelector('textarea')?.value,
      source: formType, // 'main' или 'modal'
    }

    try {
      // Отправляем в HubSpot
      await hubspotService.submitAppointmentForm(formData)

      // Показываем успешное сообщение
      if (formType === 'modal') {
        modalManager.showSuccessMessage(
          'Спасибо! Мы скоро вам перезвоним для подтверждения записи.'
        )
        // Закрываем модальное окно через 3 секунды
        setTimeout(() => {
          if (modalManager.hideModal) {
            modalManager.hideModal()
          }
        }, 3000)
      } else {
        modalManager.showSuccessMessage(
          'Спасибо! Мы скоро вам перезвоним для подтверждения записи.'
        )
      }

      // Очищаем форму
      form.reset()
    } catch (error) {
      console.error('HubSpot form error:', error)
      // Fallback: показываем обычное сообщение
      if (formType === 'modal') {
        modalManager.showSuccessMessage(
          'Спасибо! Мы скоро вам перезвоним для подтверждения записи.'
        )
        setTimeout(() => {
          if (modalManager.hideModal) {
            modalManager.hideModal()
          }
        }, 3000)
      } else {
        alert('Спасибо! Мы скоро вам перезвоним для подтверждения записи.')
      }
      form.reset()
    }
  }

  // Обработчик основной формы
  const appointmentForm = document.querySelector('.appointment-form')
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', async function (e) {
      e.preventDefault()
      await handleFormSubmit(this, 'main')
    })
  }

  // Обработчик модальной формы
  const modalForm = document.querySelector('.modal-form')
  if (modalForm) {
    modalForm.addEventListener('submit', async function (e) {
      e.preventDefault()
      await handleFormSubmit(this, 'modal')
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

  // Кнопка карты
  const mapBtn = document.querySelector('.map-btn')
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      const shortMapsUrl = 'https://maps.app.goo.gl/F3yLZFsCHpepi9JZ9'
      window.open(shortMapsUrl, '_blank')
    })
  }

  // Маска для телефона (для всех форм)
  const phoneInputs = document.querySelectorAll('input[type="tel"]')
  phoneInputs.forEach((phoneInput) => {
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
  })

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

// Остальной код без изменений
window.addEventListener('resize', () => {
  const navMenu = document.querySelector('.nav-menu')
  const navToggle = document.querySelector('.nav-toggle')

  if (window.innerWidth > 768) {
    navMenu.classList.remove('active')
    navToggle.classList.remove('active')
  }
})

if ('ontouchstart' in window) {
  document.documentElement.classList.add('touch-device')
}

preloadCriticalImages()

window.addEventListener('load', function () {
  document.body.classList.add('loaded')
})
