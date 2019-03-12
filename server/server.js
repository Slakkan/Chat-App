const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

io.on('connect', function(socket) {
    console.log('New user connected')

    socket.on('createMessage', function(message) {
        console.log(`${message.from}: ${message.text}`)
        date = new Date()
        message.createdAt = date.toTimeString()
        socket.emit('newMessage', message)
    })

    socket.on('disconnect', function() {
        console.log('User disconnected')
    })
})


server.listen(port, () => console.log(`Server is up on port ${port}`))