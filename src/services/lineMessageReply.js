const axios = require('axios')
const firebaseDatabase = require('./firebaseDatabase')

const { API_LINE, TOKEN_LINE } = process.env


const messageByUseCase = async (message) => {
  const text = message.toLowerCase()

  const replyMessage = {
    type: 'text',
    text: message
  }

  switch (text) {
    
    case 'เจ้านายชื่ออะไร': {
      try {
        const response = await firebaseDatabase.findMaster()
        const val = response.val()

        replyMessage.text = `
          ชื่อ ${val.th_firstname} ${val.th_lastname}\n
          ชื่อเล่น ไอ้ ${val.th_nickname}\n
          อายุ ${val.age}
        `

        return replyMessage
      } catch (err) {
        return replyMessage
      }
    }


    default:
      return replyMessage
  }
}

const lineMessageReply = async (replyToken, message) => {
  const replyMessage = await messageByUseCase(message)

  return axios({ // axios is Promise
    method: 'POST',
    baseURL: API_LINE,
    url: '/v2/bot/message/reply',
    headers: {
      Authorization: `Bearer ${TOKEN_LINE}` // Token can use 24 hours. We should update token every day.
    },
    data: {
      replyToken,
      messages: [replyMessage]
    }
  })
}

module.exports = lineMessageReply