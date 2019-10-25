const messageType = require('../constants/messageType')
const firebaseDataBase = require('../services/firebaseDatabase')

const lineBotMessage = async message => {
  const messages = []

  switch (message.text) {

    case messageType.YOUR_MASTER: {
      try {
        const response = await firebaseDataBase.findMaster()
        const val = response.val()
        messages.push({ type: 'text', text: `ชื่อ ${val.th_firstname} ${val.th_lastname}` })
        messages.push({ type: 'text', text: `ชื่อเล่น ไอ้ ${val.th_nickname}` })
        messages.push({ type: 'text', text: `อายุ ${val.age}` })

        return messages
      } catch (err) {
        return messages
      }
    }

    default: return messages
  }
}

module.exports = (req, res, next) => {
  const { events } = req.body

  if (!events || events.length === 0) {
    return res.json({ status: 400, message: 'invalid syntax of request body.' })
  }

  const [lineResponse] = events
  const { replyToken, message } = lineResponse

  /**
   * @Note For log on clound server
   */
  console.log(`Message token: ${replyToken}`) 
  console.log(`Message from chat: ${message.text}`)

  req.replyToken = replyToken
  req.messages = await lineBotMessage(message)

  return next()

}