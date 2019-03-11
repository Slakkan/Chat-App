import { join } from 'path'
import express from 'express'

const app = express()

const publicPath = join(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

app.listen(port, () => console.log(`Server is up on port ${port}`))