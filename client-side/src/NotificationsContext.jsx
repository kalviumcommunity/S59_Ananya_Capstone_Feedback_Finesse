import React, { createContext, useContext, useState, useEffect } from 'react'
import io from 'socket.io-client'

const NotificationsContext = createContext()

export const useNotifications = () => useContext(NotificationsContext)

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const username = sessionStorage.getItem('username')
    const createNew = io(import.meta.env.VITE_URI)
    setSocket(createNew)

    createNew.emit('register', username)

    createNew.on('notification', (e) => {
      setNotifications((prev) => [...prev, e])
    })

  }, [])

  return (
    <NotificationsContext.Provider value={{ setNotifications, notifications, socket }}>
      {children}
    </NotificationsContext.Provider>
  )
};
