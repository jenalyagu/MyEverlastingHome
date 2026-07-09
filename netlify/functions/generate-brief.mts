import type { Handler } from '@netlify/functions'

// Inline buildBoardBrief via dynamic import — Netlify esbuild will bundle it
const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const body = JSON.parse(event.body ?? '{}')
  const formData = body.formData
  if (!formData) {
    return { statusCode: 400, body: JSON.stringify({ error: 'formData is required' }) }
  }

  try {
    const { buildBoardBrief, briefToMarkdown } = await import('../../src/lib/buildBoardBrief.js')
    const brief = buildBoardBrief(formData, {})
    const markdown = briefToMarkdown(brief)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief, markdown }),
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { statusCode: 500, body: JSON.stringify({ error: message }) }
  }
}

export { handler }
