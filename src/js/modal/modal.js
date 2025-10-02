class ModalManager {
  constructor() {
    this.modalOverlay = document.getElementById('modalOverlay')
    this.modalClose = document.getElementById('modalClose')
    this.appointmentForm = document.getElementById('appointmentForm')
    this.reviewForm = document.getElementById('reviewForm')

    this.init()
  }

  init() {
    // Закрытие модалки
    this.modalClose.addEventListener('click', () => this.closeModal())
    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) {
        this.closeModal()
      }
    })

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'Escape' &&
        this.modalOverlay.classList.contains('active')
      ) {
        this.closeModal()
      }
    })

    // Обработка форм
    this.bindFormHandlers()

    // Вешаем обработчики на все кнопки
    this.bindButtons()
  }

  bindFormHandlers() {
    // Обработка формы записи
    this.appointmentForm
      .querySelector('form')
      .addEventListener('submit', (e) => {
        e.preventDefault()
        this.handleAppointmentSubmit(e)
      })

    // Обработка формы отзыва
    this.reviewForm.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault()
      this.handleReviewSubmit(e)
    })
  }

  bindButtons() {
    // Кнопки "Book Now" в услугах
    document.querySelectorAll('.service-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const serviceCard = btn.closest('.service-card')
        const serviceName =
          serviceCard.querySelector('.service-title').textContent
        this.openAppointmentModal(serviceName)
      })
    })

    // Кнопка "Book an Appointment" в герое
    document
      .querySelector('.hero .cta-button')
      ?.addEventListener('click', (e) => {
        e.preventDefault()
        this.openAppointmentModal('General Appointment')
      })

    // Кнопка "Free Diagnostics"
    document
      .querySelector('.cta-button-large')
      ?.addEventListener('click', (e) => {
        e.preventDefault()
        this.openAppointmentModal('Free Diagnostics')
      })

    // Кнопка "Write a Review"
    document.querySelector('.review-btn')?.addEventListener('click', (e) => {
      e.preventDefault()
      this.openReviewModal()
    })

    // Кнопка "Visit Service Center"
    document.querySelector('.gallery-btn')?.addEventListener('click', (e) => {
      e.preventDefault()
      this.openAppointmentModal('Service Visit')
    })
  }

  openAppointmentModal(serviceName = 'Appointment') {
    this.showForm(this.appointmentForm)
    this.hideForm(this.reviewForm)

    const title = this.appointmentForm.querySelector('.modal-title')
    title.textContent = `Book ${serviceName}`

    // Устанавливаем выбранную услугу в селект
    const select = this.appointmentForm.querySelector('select')
    if (
      serviceName !== 'General Appointment' &&
      serviceName !== 'Free Diagnostics'
    ) {
      const option = Array.from(select.options).find(
        (opt) =>
          opt.text.toLowerCase().includes(serviceName.toLowerCase()) ||
          serviceName.toLowerCase().includes(opt.text.toLowerCase())
      )
      if (option) {
        select.value = option.value
      }
    }

    this.openModal()
  }

  openReviewModal() {
    this.showForm(this.reviewForm)
    this.hideForm(this.appointmentForm)
    this.openModal()
  }

  showForm(form) {
    form.style.display = 'block'
    form.style.opacity = '1'
  }

  hideForm(form) {
    form.style.opacity = '0'
    form.style.display = 'none'
  }

  openModal() {
    this.modalOverlay.classList.add('active')
    document.body.style.overflow = 'hidden'
  }

  closeModal() {
    this.modalOverlay.classList.remove('active')
    document.body.style.overflow = ''

    // Сбрасываем формы с задержкой
    setTimeout(() => {
      this.resetForms()
    }, 300)
  }

  resetForms() {
    // Сбрасываем обе формы
    this.appointmentForm.querySelector('form').reset()
    this.reviewForm.querySelector('form').reset()

    // Сбрасываем звезды рейтинга
    const stars = this.reviewForm.querySelectorAll('input[type="radio"]')
    stars.forEach((star) => (star.checked = false))
  }

  handleAppointmentSubmit(e) {
    const form = e.target
    // const formData = new FormData(form)
    const data = {
      name: form.querySelector('input[type="text"]').value,
      phone: form.querySelector('input[type="tel"]').value,
      service: form.querySelector('select').value,
      comment: form.querySelector('textarea').value,
    }

    console.log('Appointment data:', data)
    this.showSuccessMessage(
      'We will contact you shortly to confirm your appointment.'
    )
  }

  handleReviewSubmit(e) {
    const form = e.target
    // const formData = new FormData(form)
    const rating = form.querySelector('input[name="rating"]:checked')

    const data = {
      name: form.querySelector('input[type="text"]').value,
      car: form.querySelectorAll('input[type="text"]')[1].value,
      rating: rating ? rating.value : null,
      review: form.querySelector('textarea').value,
    }

    console.log('Review data:', data)
    this.showSuccessMessage(
      'Thank you for your review! It will be published after moderation.',
      'review-success'
    )
  }

  showSuccessMessage(message, successClass = '') {
    const activeForm =
      this.appointmentForm.style.display !== 'none'
        ? this.appointmentForm
        : this.reviewForm
    const originalContent = activeForm.innerHTML

    activeForm.innerHTML = `
            <div class="success-message ${successClass}">
                <div class="success-icon">${successClass ? '⭐' : '✅'}</div>
                <p>${message}</p>
            </div>
        `

    setTimeout(() => {
      activeForm.innerHTML = originalContent
      this.bindFormHandlers() // Перепривязываем обработчики
      this.closeModal()
    }, 3000)
  }
}

export const modalManager = new ModalManager()
