class Header {
  constructor() {
    this.header = document.querySelector('.header')
    this.navToggle = document.querySelector('.nav-toggle')
    this.navMenu = document.querySelector('.nav-menu')
    this.navLinks = document.querySelectorAll('.nav-link')
    this.sections = document.querySelectorAll('section[id]')

    this.init()
  }

  init() {
    // Обработчик скролла
    window.addEventListener('scroll', () => this.handleScroll())

    // Обработчик бургер-меню
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMenu())
    }

    // Обработчики кликов по ссылкам
    this.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => this.handleLinkClick(e))
    })

    // Закрытие меню при клике outside
    document.addEventListener('click', (e) => this.handleOutsideClick(e))

    // Активная секция при загрузке
    this.setActiveSection()
  }

  handleScroll() {
    // Эффект при скролле
    if (window.scrollY > 100) {
      this.header.classList.add('scrolled')
    } else {
      this.header.classList.remove('scrolled')
    }

    // Активная секция
    this.setActiveSection()
  }

  toggleMenu() {
    this.navMenu.classList.toggle('active')
    this.navToggle.classList.toggle('active')
  }

  handleLinkClick(e) {
    e.preventDefault()

    const targetId = e.target.getAttribute('href')
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      // Закрываем меню на мобильных
      if (this.navMenu.classList.contains('active')) {
        this.toggleMenu()
      }

      // Плавная прокрутка
      const headerHeight = this.header.offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })

      // Обновляем активную ссылку
      this.setActiveLink(targetId)
    }
  }

  handleOutsideClick(e) {
    if (
      !this.navToggle.contains(e.target) &&
      !this.navMenu.contains(e.target)
    ) {
      this.navMenu.classList.remove('active')
      this.navToggle.classList.remove('active')
    }
  }

  setActiveSection() {
    const scrollPosition = window.scrollY + 100

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute('id')

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        this.setActiveLink(`#${sectionId}`)
      }
    })
  }

  setActiveLink(targetId) {
    this.navLinks.forEach((link) => {
      link.classList.remove('active')
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active')
      }
    })
  }
}

export const headerManager = new Header()
