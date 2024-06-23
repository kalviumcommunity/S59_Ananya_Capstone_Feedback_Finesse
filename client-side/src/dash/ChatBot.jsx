import React, { useState } from 'react'
import axios from 'axios'
import "./DashCSS/ChatBot.css"
import CardLoader from '../components/CardLoader'
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone'

const ChatBot = () => {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [loader, setLoader] = useState(false)

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = async (e) => {
    setLoader(true)
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_URI}/chatbot`, { query })
      setResponse(res.data.response)
      setLoader(false)
    } 
    catch (error) {
      console.error('Error getting response:', error)
      setResponse('Failed to get response')
    }
  }

  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <>
    <div className="container-AI">
    <h1 className='text-darkred text-center font-bold font-sans text-3xl'>Interact with our AI chatbot to clear your queries !</h1>
      <form onSubmit={handleSubmit} className='flex items-center'>
        <input type="search" value={query} onKeyDown={handleKeyPress} onChange={handleQueryChange} placeholder="Ask a question..." />
        <button type="submit">Ask</button>
      </form>
      <div className="response">
        
        {loader ? <CardLoader /> : <><h3><SmartToyTwoToneIcon style={{fontSize: "5vh", color: "#570101"}}/> Response:</h3><p className="text-black animated-text">{response.length == 0 ? "Hey! How can I help you?" : response.length <= 3 ? "Sorry! I couldn't understand your question" : response}</p></>}
      
      </div>
    </div>
    </>
  )
}

export default ChatBot
