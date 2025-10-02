export function preloadCriticalImages() {
  const criticalImages = [
    'https://www.26thstreetauto.com/Files/Documents/AdobeStock_434099016.jpeg',
    'https://daveandraysauto.com/wp-content/uploads/2024/09/How-Regular-Car-Maintenance-Boosts-Resale-Value-and-Saves-You-Money.jpg',
  ]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}
