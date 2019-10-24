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
  return res.send(`Hi there! This is a nodejs-line-message running on PORT: ${PORT} `)
})

app.post('/webhook', (req, res) => {
  const { replyToken, message } = req.body.events[0]

  console.log(`Message token: ${replyToken}`)
  console.log(`Message from chat: ${message.text}`)

  return res.json({ status: 200,  message: 'Webhook is working!' })
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))