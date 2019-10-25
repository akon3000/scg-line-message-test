const axios = require('axios')

const { API_LINE, TOKEN_LINE } = process.env

const lineMessageReply = (replyToken, messages) => axios({ // axios is Promise
  method: 'POST',
  baseURL: API_LINE,
  url: '/v2/bot/message/reply',
  headers: {
    Authorization: `Bearer ${TOKEN_LINE}` // Token can use 24 hours. We should update token every day.
  },
  data: {
    replyToken,
    messages
  }
})


module.exports = lineMessageReply