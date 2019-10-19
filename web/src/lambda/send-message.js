export const handler = (event, context, callback) => {
  console.log(event)
  callback(null, {
    // return null to show no errors
    statusCode: 200, // http status code
    body: event.body
  })
}
