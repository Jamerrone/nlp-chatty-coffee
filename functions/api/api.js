const manager = require('./manager.js')

exports.handler = async function(event) {
  try {
    const message = decodeURI(event.queryStringParameters.message)
    const language = event.queryStringParameters.lang

    manager.load()

    const nlpResponse = await manager.process(language, message)

    return {
      statusCode: 200,
      body: await JSON.stringify(nlpResponse, null, 2)
    }
  } catch (error) {
    console.log(error)

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }, null, 2)
    }
  }
}
