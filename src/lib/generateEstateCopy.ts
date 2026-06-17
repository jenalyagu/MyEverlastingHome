import type { EstateFormData } from './blueprintGenerator'

export interface EstateCopy {
  estateName: string
  estateSubtitle: string
  estateNarrative: string
  editorialNote: string
  footerTagline: string
  footerMonogram: string
}

export async function generateEstateCopy(formData: EstateFormData): Promise<EstateCopy> {
  const res = await fetch('/api/generate-copy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formData }),
  })

  if (!res.ok) {
    throw new Error(`Copy generation failed: ${res.status}`)
  }

  return res.json() as Promise<EstateCopy>
}
