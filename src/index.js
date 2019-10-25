/**
 * @author Tinnapop Suraphon
 * @email vonmane001@gmail.com
 * @desc A sample project of Node.js and Line API
*/

require('dotenv').config()

const app = require('express')()
const bodyParser = require('body-parser')
const lineWebhook = require('./middleware/lineWebhook')
const lineMessageReply = require('./services/lineMessageReply')

const { PORT } = process.env

// ------------------------------------------------

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send(`Hi there! This is a nodejs-line-message running on PORT: ${PORT} `))

/**
 * @response
 *  - success https://developers.line.biz/en/reference/messaging-api/#response
 *  - error https://developers.line.biz/en/reference/messaging-api/#error-responses
 */
app.post('/webhook', lineWebhook, async (req, res) => {
  const { replyToken, messages } = req

  if (messages.length === 0) {
    return res.json({
      status: 200,
      message: 'Webhook already tigger!!'
    })
  }

  try {
    await lineMessageReply(replyToken, messages)
    
    return res.json({
      status: 200,
      message: 'Sent message!'
    })

  } catch (err) {

    console.log(`Message error: ${err.response.data.message}`) // For log on clound server

    return res.json({
      status: err.response.status,
      message: err.response.data.message
    })

  }
  
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))