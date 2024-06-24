const { Server } = require('socket.io')

let io
const userSockets = {}

const makeWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', process.env.REACT_URL],
      methods: ['GET', 'POST'],
      credentials: true,
    }
  })

  io.on('connection', (socket) => {
  
    socket.on('register', (username) => {
      userSockets[username] = socket.id; 
      console.log(`${username} connected via .io`)
    })

    socket.on('disconnect', () => {
    for (const username in userSockets) {
      if (userSockets[username] == socket.id) {
        delete userSockets[username]
        console.log(`${username} disconnected`)
        break
      }
    }

    })
  })
}

const notifyUser = (username, message) => {
  const socketId = userSockets[username]
  if (socketId && io.sockets.sockets.has(socketId)) io.to(socketId).emit('notification', message)
  else console.log(`Socket not found for user ${username}`)
}

module.exports = { makeWebSocket, notifyUser }
