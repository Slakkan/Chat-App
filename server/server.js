const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage, generateLocationMessage } = require('./utils/message')
const {isRealString} = require("./utils/validation")
const {Users} = require('./utils/users')
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const users = new Users()

app.use(express.static(publicPath))

io.on('connect', function(socket) {

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Insert a valid name and room')
        }

        socket.join(params.room)
        users.removeUser(socket.id)
        users.addUser(socket.id, params.name, params.room)

        io.to(params.room).emit('updateUsersList', users.getUserList(params.room))
        socket.emit('newMessage', generateMessage('Server', `Welcome to ${params.room} chat room`))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Server', `${params.name} joined the chat`))

        callback()
    })

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.user, message.text))
        callback()
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Server', coords.latitude, coords.longitude))
    })

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Server', `${user.name} left the chat room`))
        }
    })
})


server.listen(port, () => console.log(`Server is up on port ${port}`))