class GalleryFilter {
  constructor() {
    this.filterBtns = document.querySelectorAll('.filter-btn')
    this.galleryItems = document.querySelectorAll('.gallery-item')
    this.lightbox = this.createLightbox()

    if (this.filterBtns.length > 0) {
      this.init()
    }
  }

  init() {
    this.filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => this.filterGallery(btn))
    })

    this.galleryItems.forEach((item) => {
      item.addEventListener('click', () => this.openLightbox(item))
    })
  }

  filterGallery(clickedBtn) {
    this.filterBtns.forEach((btn) => btn.classList.remove('active'))
    clickedBtn.classList.add('active')

    const filter = clickedBtn.dataset.filter

    this.galleryItems.forEach((item) => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block'
        setTimeout(() => {
          item.style.opacity = '1'
          item.style.transform = 'scale(1)'
        }, 50)
      } else {
        item.style.opacity = '0'
        item.style.transform = 'scale(0.8)'
        setTimeout(() => {
          item.style.display = 'none'
        }, 300)
      }
    })
  }

  createLightbox() {
    const lightbox = document.createElement('div')
    lightbox.className = 'lightbox'
    lightbox.innerHTML = `
            <button class="lightbox-close">×</button>
            <img class="lightbox-content" src="" alt="">
        `
    document.body.appendChild(lightbox)

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      lightbox.style.display = 'none'
    })

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none'
      }
    })

    return lightbox
  }

  openLightbox(item) {
    const img = item.querySelector('img')
    const lightboxImg = this.lightbox.querySelector('.lightbox-content')
    lightboxImg.src = img.src
    lightboxImg.alt = img.alt
    this.lightbox.style.display = 'flex'
  }
}

export const galleryFilter = new GalleryFilter()
