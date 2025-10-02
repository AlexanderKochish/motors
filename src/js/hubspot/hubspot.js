export class HubSpotService {
  constructor() {
    this.portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID
    this.baseUrl = 'https://app-eu1.hubspot.com/submissions'
  }

  async submitForm(formId, formData) {
    try {
      const response = await fetch(
        `${this.baseUrl}/${this.portalId}/form/${formId}/submissions`,
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
        throw new Error(`HubSpot error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('HubSpot submission failed:', error)
      throw error
    }
  }

  mapFormData(data) {
    const fields = []

    if (data.firstname) {
      fields.push({ name: 'firstname', value: data.firstname })
    }
    if (data.phone) {
      fields.push({ name: 'phone', value: data.phone })
    }
    if (data.service_type) {
      fields.push({ name: 'service_type', value: data.service_type })
    }
    if (data.message) {
      fields.push({ name: 'message', value: data.message })
    }
    if (data.source) {
      fields.push({ name: 'lead_source', value: data.source })
    }

    return fields
  }

  // Для обеих форм appointments
  async submitAppointmentForm(formData) {
    const formId = import.meta.env.VITE_HUBSPOT_FORM_ID
    return await this.submitForm(formId, formData)
  }
}

export const hubspotService = new HubSpotService()
