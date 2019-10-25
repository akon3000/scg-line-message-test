/**
 * @author Tinnapop Suraphon
 * @email vonmane001@gmail.com
 * @desc A sample project of Node.js and Line API
*/

require('dotenv').config()

const app = require('express')()
const bodyParser = require('body-parser')
const firebaseDatabase = require('./services/firebaseDatabase')
const lineMessageReply = require('./services/lineMessageReply')

const { PORT } = process.env

// ------------------------------------------------

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  return res.send(`Hi there! This is a nodejs-line-message running on PORT: ${PORT} `)
})

app.post('/webhook', async (req, res) => {
  const { replyToken, message } = req.body.events[0]

  console.log(`Message token: ${replyToken}`) // For log on clound server
  console.log(`Message from chat: ${message.text}`) // For log on clound server

  try {

    // respone => https://developers.line.biz/en/reference/messaging-api/#response

    const { data: response } = await lineMessageReply(replyToken, message.text)

    console.log(`Reply message result:`, response) // For log on clound server

    return res.json({ status: 200, message: 'Sent message!' })

  } catch (err) {
    // see more if you got error from line => https://developers.line.biz/en/reference/messaging-api/#error-responses

    console.log(`Message error: ${err.response.data.message}`) // For log on clound server

    return res.json({ status: err.response.status, message: err.response.data.message })
  }
  
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))