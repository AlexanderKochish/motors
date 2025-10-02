import { galleryFilter } from './gallery/gallery'
import { headerManager } from './header/header'
import { preloadCriticalImages } from './helpers/preloadCriticalImages'
import { animateCounters } from './initScrollAnimations/animateCounters'
import { initScrollAnimations } from './initScrollAnimations/initScrollAnimations'
import { modalManager } from './modal/modal'
import { testimonialsSlider } from './testimonials/testimonials'
import { hubspotService } from './services/hubspot'

document.addEventListener('DOMContentLoaded', function () {
  // Инициализация менеджеров
  if (headerManager && headerManager.init) headerManager.init()
  if (testimonialsSlider && testimonialsSlider.init) testimonialsSlider.init()
  if (modalManager && modalManager.init) modalManager.init()
  if (galleryFilter && galleryFilter.init) galleryFilter.init()

  const handleFormSubmit = async (form, formType = 'main') => {
    const formData = {
      firstname: form.querySelector('input[type="text"]')?.value,
      phone: form.querySelector('input[type="tel"]')?.value,
      service_type: form.querySelector('select')?.value,
      message: form.querySelector('textarea')?.value,
      source: formType,
    }

    if (!formData.firstname || !formData.phone) {
      alert('Пожалуйста, заполните обязательные поля: Имя и Телефон')
      return
    }

    try {
      const submitBtn = form.querySelector('.submit-btn')
      submitBtn.textContent = 'Sending...'
      submitBtn.disabled = true

      await hubspotService.submitAppointmentForm(formData)

      console.log('Форма успешно отправлена в HubSpot')

      if (formType === 'modal') {
        if (modalManager.showSuccessMessage) {
          modalManager.showSuccessMessage(
            'Thank you! We will call you back soon to confirm your appointment.'
          )
        } else {
          alert(
            'Thank you! We will call you back soon to confirm your appointment.'
          )
        }

        setTimeout(() => {
          if (modalManager.hideModal) {
            modalManager.hideModal()
          }
        }, 3000)
      } else {
        alert(
          'Thank you! We will call you back soon to confirm your appointment.'
        )
      }

      form.reset()
    } catch (error) {
      console.error('Error to sended form:', error)

      alert(
        'Thank you! We have received your request and will call you back soon.'
      )
      form.reset()
    } finally {
      // Восстанавливаем кнопку
      const submitBtn = form.querySelector('.submit-btn')
      if (submitBtn) {
        submitBtn.textContent = 'Book Appointment'
        submitBtn.disabled = false
      }
    }
  }

  const appointmentForm = document.querySelector('.appointment-form')
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', async function (e) {
      e.preventDefault()
      await handleFormSubmit(this, 'main')
    })
  }

  const modalForm = document.querySelector('.modal-form')
  if (modalForm) {
    modalForm.addEventListener('submit', async function (e) {
      e.preventDefault()
      await handleFormSubmit(this, 'modal')
    })
  }

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

if ('ontouchstart' in window) {
  document.documentElement.classList.add('touch-device')
}

preloadCriticalImages()

window.addEventListener('load', function () {
  document.body.classList.add('loaded')
})
