const socket = io()

socket.on('connect', () => {
    console.log('Connected to server')

})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('newMessage', function(message) {
    console.log(`${message.from}: ${message.text} | sent at ${message.createdAt}`)
})