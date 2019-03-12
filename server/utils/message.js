const moment = require('moment')

const generateMessage = (user, text) => {
    return {
        user,
        text,
        createdAt: moment().valueOf()
    }
}

const generateLocationMessage = (user, latitude, longitude) => {
    return {
        user,
        url: `https://www.google.com.ar/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    }
}

module.exports = { generateMessage, generateLocationMessage }