require('dotenv').config({
  path: `../.env.${process.env.NODE_ENV || 'development'}`
})

const mailgun = require('mailgun-js')({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN
})

// const data = {
//   from: 'Excited User contact@chrisczach.com>',
//   to: `foo@example.com, contact@chrisczach.com`,
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomeness!'
// }

export const handler = ({body}, context, callback) => {
  const data = createMessage(body)
  mailgun.messages().send(data, (error, responseBody) => {
    console.log(responseBody)
    if (error) {
      console.log(error)
      return callback(null, {
        // return null to show no errors
        statusCode: 500, // http status code
        body: 'some error'
      })
    }
    callback(null, {
      // return null to show no errors
      statusCode: 200, // http status code
      body: body
    })
  })
}

const createMessage = body => {
  const {name, email, phone, subject, message} = JSON.parse(body)

  return {
    from: `Chris Czach <contact@chrisczach.com>`,
    to: `${email.replace(/\s/g, '').toLowerCase()}, contact@chrisczach.com`,
    subject: 'Thank you for your message!',
    text: `Hello ${toTitleCase(name)},
      
      We've received your message and respond as soon as possible. Your original message is below.

      Thank you,

      Chris Czach

      ______________________________________
      Full Name:
      ${toTitleCase(name)}

      Email:
      ${email.replace(/\s/g, '')}

      ${
  phone
    ? `Phone:
      ${phone}

      `
    : ''
}
      ${
  subject
    ? `Subject:
      ${subject}

      `
    : ''
}
      Message:
      ${message}
      `
  }
}

const toTitleCase = str =>
  str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
