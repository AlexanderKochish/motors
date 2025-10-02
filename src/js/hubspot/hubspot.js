export class HubSpotService {
  constructor() {
    this.portalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID
    this.formId = import.meta.env.VITE_HUBSPOT_FORM_ID
    this.accessToken = import.meta.env.VITE_HUBSPOT_ACCESS_TOKEN
  }

  async submitAppointmentForm(formData) {
    try {
      const submissionData = {
        fields: [
          {
            name: 'firstname',
            value: formData.firstname || '',
          },
          {
            name: 'phone',
            value: formData.phone || '',
          },
          {
            name: 'service_type',
            value: formData.service_type || '',
          },
          {
            name: 'message',
            value: formData.message || '',
          },
          {
            name: 'lead_source',
            value: formData.source || 'website',
          },
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title,
        },
      }

      console.log('Submitting to HubSpot...')

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${this.portalId}/${this.formId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
          },
          body: JSON.stringify(submissionData),
        }
      )

      console.log('Response status:', response.status)

      if (response.status === 401) {
        throw new Error(
          'Invalid access token - check your Private App settings'
        )
      }

      if (response.status === 403) {
        throw new Error('Access forbidden - check form ID and portal ID')
      }

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HubSpot error ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log('Form submitted successfully!')
      return result
    } catch (error) {
      console.error('HubSpot submission failed:', error)
      throw error
    }
  }
}

export const hubspotService = new HubSpotService()
