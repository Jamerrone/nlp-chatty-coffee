const manager = require('./manager.js')

exports.handler = async function(event) {
  try {
    const utterance = event.queryStringParameters.utterance
    const language = event.queryStringParameters.language

    manager.load()

    const nlpResponse = await manager.process(language, utterance)

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
