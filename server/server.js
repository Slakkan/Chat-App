const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage } = require('./utils/message')
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

io.on('connect', function(socket) {
    console.log('New user connected')

    socket.emit('newMessage', generateMessage('Server', 'Welcome to the chat app'))

    socket.broadcast.emit('newMessage', generateMessage('Server', 'New user joined the chat'))

    socket.on('createMessage', function(message) {
        console.log(`${message.user}: ${message.text}`)
        io.emit('newMessage', generateMessage(message.user, message.text))
    })

    socket.on('disconnect', function() {
        console.log('User disconnected')
    })
})


server.listen(port, () => console.log(`Server is up on port ${port}`))