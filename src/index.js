/**
 * @author Tinnapop Suraphon
 * @email vonmane001@gmail.com
 * @desc A sample project of Node.js and Line API
*/

require('dotenv').config()

const app = require('express')()
const bodyParser = require('body-parser')
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

  console.log(`Message token: ${replyToken}`)
  console.log(`Message from chat: ${message.text}`)

  try {
    const { data: response } = await lineMessageReply(replyToken, message.text)

    console.log(`Reply message result : ${response}`)

    return res.json({ status: 200, message: 'Sent message!' })
    
  } catch (err) {

    console.log(`Message error: ${ err.response.data.message}`)

    return res.json({ status: err.response.status, message: err.response.data.message })
  }
  
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))