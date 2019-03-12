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

socket.on('newLocationMessage', function(message) {
    const li = jQuery('<li></li>')
    const a = jQuery('<a target="_blank">My current location</a>')

    li.text(`${message.user}: `)
    a.attr('href', message.url)
    li.append(a)
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

const locationButton = jQuery('#send-location')
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        alert('Unable to fetch location')
    })
})