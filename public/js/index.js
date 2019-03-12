const socket = io()

socket.on('connect', () => {
    console.log('Connected to server')

})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('newMessage', function(message) {
    const timeSent = moment(message.createdAt).format("H:mm")
    const template = jQuery('#message-template').html()
    const html = Mustache.render(template, {
        user: message.user,
        text: message.text,
        sentAt: `sent at ${timeSent}`
    })

    jQuery('#messages').append(html)
})

socket.on('newLocationMessage', function(message) {
    const timeSent = moment(message.createdAt).format("H:mm")
    const template = jQuery('#location-message-template').html()
    const html = Mustache.render(template, {
        user: message.user,
        url: message.url,
        sentAt: `sent at ${timeSent}`
    })

    jQuery('#messages').append(html)
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault()

    const messageTextbox = jQuery('[name=message]')

    socket.emit('createMessage', {
        user: 'Lisandro',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('')
    })
})

const locationButton = jQuery('#send-location')
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...')

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location')
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text('Send location')
        alert('Unable to fetch location')
    })
})