import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3333, () => {
  console.log('HTTP server running on http://localhost:3333')
})