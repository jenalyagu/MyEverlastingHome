import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001
const IS_PROD = process.env.NODE_ENV === 'production'

app.use(cors())
app.use(express.json({ limit: '10mb' }))

if (IS_PROD) {
  const distPath = path.join(__dirname, 'dist')
  app.use(express.static(distPath))
}

// ---------------------------------------------------------------------------
// Board brief — fills all template slots deterministically, returns the
// complete brief as JSON + markdown string
// ---------------------------------------------------------------------------
app.post('/api/generate-brief', async (req, res) => {
  const formData = req.body?.formData
  if (!formData) {
    res.status(400).json({ error: 'formData is required' })
    return
  }

  try {
    const { buildBoardBrief, briefToMarkdown } = await import('./src/lib/buildBoardBrief.js')
    const brief = buildBoardBrief(formData, {})
    const markdown = briefToMarkdown(brief)
    console.log(`\n--- BOARD BRIEF generated for "${brief.estateName}" ---`)
    res.json({ brief, markdown })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Brief generation error:', message)
    res.status(500).json({ error: message })
  }
})

if (IS_PROD) {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  if (!IS_PROD) {
    console.log('API available at http://localhost:' + PORT + '/api/generate-brief')
  }
})
