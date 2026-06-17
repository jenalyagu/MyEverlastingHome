import type { EstateFormData } from './blueprintGenerator'
import type { BoardBrief } from './buildBoardBrief'

export interface BoardBriefResponse {
  brief: BoardBrief
  markdown: string
}

export async function fetchBoardBrief(formData: EstateFormData): Promise<BoardBriefResponse> {
  const res = await fetch('/api/generate-brief', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formData }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
    throw new Error(err.error ?? `Brief generation failed (${res.status})`)
  }
  return res.json() as Promise<BoardBriefResponse>
}
