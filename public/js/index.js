const socket = io()

socket.on('connect', () => {
    console.log('Connected to server')

})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('newMessage', function(message) {
    const li = jQuery('<li></li>')
    li.text(`${message.user}: ${message.text} | sent at ${message.createdAt}`)
    jQuery('#messages').append(li)
})


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault()

    socket.emit('createMessage', {
        user: 'Lisandro',
        text: jQuery('[name=message]').val()
    }, function() {

    })
})