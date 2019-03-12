const socket = io()

socket.on('connect', () => {
    console.log('Connected to server')

})

socket.on('disconnect', () => {
    console.log('Disconnected from server')
})

socket.on('newMessage', function(message) {
    const li = jQuery('<li></li>')
    const timeSent = moment(message.createdAt).format("H:mm")
    li.text(`${message.user}: ${message.text} | sent at ${timeSent}`)
    jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function(message) {
    const li = jQuery('<li></li>')
    const a = jQuery('<a target="_blank">My current location</a>')
    const sentLabel = jQuery('<label></label>')
    const timeSent = moment(message.createdAt).format("H:mm")

    sentLabel.text(` | sent at ${timeSent}`)
    li.text(`${message.user}: `)
    a.attr('href', message.url)
    li.append(a)
    li.append(sentLabel)
    jQuery('#messages').append(li)
    
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