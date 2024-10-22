const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cors = require('cors')
app.use(cors())

require('./db/connection')

const empRoute = require('./router/admin')
app.use('/emp', empRoute)

require('dotenv').config()
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`App is listening to ${PORT}`)
})