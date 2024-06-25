import React from 'react';
import axios from 'axios'
import { Box, Button, Typography, Avatar } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

const Coffee = () => {
  const checkoutHandler = async () => {
    try {
      const { data: { key } } = await axios.get(`${import.meta.env.VITE_URI}/payment/get-key`)

      const { data: order } = await axios.post(`${import.meta.env.VITE_URI}/payment/create-order`, {
        amount: 100 
      })

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Buy Me a Coffee",
        description: "Support the creator",
        image: "https://avatars.githubusercontent.com/u/144683235?v=4",
        order_id: order.id,
        callback_url: `${import.meta.env.VITE_URI}/payment/verify-payment`,
        prefill: {
          name: "Ananya Tewari",
          email: "ananyatewari0205@gmail.com",
          contact: "+91 8199075665"
        },
        notes: {
          "address": "Feedback Finnesse"
        },
        theme: {
          "color": "#900000"
        }
      }
      const razor = new window.Razorpay(options)
      razor.open()
    } 
    
    catch (error) {
      console.error("Error during checkout:", error)
    }
  }

  const mediumScreen = useMediaQuery('(max-width:700px)')
  const smallScreen = useMediaQuery("(max-width: 500px)")

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height={mediumScreen ? "50vh" : "fit-content"} marginBottom={15}>
    <Box width={smallScreen ? "80vw" : "50vw"} display="flex" flexDirection={mediumScreen ? 'column-reverse' : 'row'} alignItems="center" justifyContent="space-between" mt={5} p={3} boxShadow={3} borderRadius={2}>
      <Box>
        <Typography variant="h5" gutterBottom fontSize={mediumScreen ? 19 : 29}>
          Meet the creator of this app, <br></br> Ananya Tewari
        </Typography>
        <Typography variant="body1" fontSize={mediumScreen ? 15 : 20} gutterBottom>
          Buy her a coffee!🧋
        </Typography>
        <Button variant="contained" color="primary" onClick={checkoutHandler} sx={{ mt: mediumScreen ? 1 : 2 }}>
          Buy Now
        </Button>
      </Box>
      <Box>
        <Avatar src="https://avatars.githubusercontent.com/u/144683235?v=4" alt="Ananya Tewari" sx={{ width: mediumScreen ? 100 : 160, height: mediumScreen ? 100 : 160, mb: 2 }}/>
      </Box>
    </Box>
    </Box>
  )
}

export default Coffee