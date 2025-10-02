export class HubSpotService {
  constructor(portalId, formId) {
    this.portalId = portalId
    this.formId = formId
    this.baseUrl = 'https://api.hsforms.com/submissions/v3/integration/submit'
  }

  async submitForm(formData) {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.portalId}/${this.formId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: this.mapFormData(formData),
            context: {
              pageUri: window.location.href,
              pageName: document.title,
            },
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('HubSpot submission error:', error)
      throw error
    }
  }

  mapFormData(data) {
    return Object.entries(data).map(([name, value]) => ({
      name,
      value: value || '',
    }))
  }
}

// Создаем инстанс (данные из .env)
export const hubspot = new HubSpotService(
  import.meta.env.VITE_HUBSPOT_PORTAL_ID,
  import.meta.env.VITE_HUBSPOT_FORM_ID
)
