export function animateCounters() {
  const counters = document.querySelectorAll('.stat-number')

  counters.forEach((counter) => {
    const target = +counter.getAttribute('data-target')
    const duration = 2000
    const step = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      counter.textContent = Math.floor(current) + (target === 100 ? '%' : '')
    }, 16)
  })
}
