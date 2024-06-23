const { ChatGoogleGenerativeAI } = require('@langchain/google-genai')
const { HumanMessage } = require('@langchain/core/messages')
require('dotenv').config()

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  apiKey: process.env.VITE_GENAI_API_KEY
})

async function getAIResponse(question) {
  let response = ""
  try {
    const message = new HumanMessage({ content: [{ type: "text", text: question }] })
    const res = await model.invoke([ message ]) 
    response = res.text 
  } 
  catch (error) {
    console.error("Error while generating response:", error)
  }
  return response
}

module.exports = { getAIResponse }