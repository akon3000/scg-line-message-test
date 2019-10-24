/**
 * @author Tinnapop Suraphon
 * @email vonmane001@gmail.com
 * @desc A sample project of Node.js and Line API
*/

require('dotenv').config()

const app = require('express')()
const axios = require('axios')
const bodyParser = require('body-parser')

const { PORT } = process.env

// ------------------------------------------------

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send(`Hi there! This is a nodejs-line-message running on PORT: ${PORT} `)
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))