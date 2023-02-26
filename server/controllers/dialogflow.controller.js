const dialogflow = require('dialogflow')

const projectId = 'rmcbot-srkm'
const sessionClient = new dialogflow.SessionsClient()
const sessionPath = sessionClient.projectAgentSessionPath(
  projectId,
  'unique-session-id'
)

exports.query = async (req, res) => {
  try {
    const query = req.body.query
    if (!query) {
      return res.status(400).json({ error: 'Missing query parameter' })
    }
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: 'en-US'
        }
      }
    }
    const responses = await sessionClient.detectIntent(request)
    const result = responses[0].queryResult
    if (!result.fulfillmentText) {
      return res.status(404).json({ error: 'No response found' })
    }
    res.json({ response: result.fulfillmentText })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: e.message })
  }
}
