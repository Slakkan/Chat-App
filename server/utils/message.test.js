const expect = require('expect')

const { generateMessage, generateLocationMessage } = require('./message')


describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const user = 'Jen'
        const text = 'some message'
        const message = generateMessage(user,text)

        expect(typeof message.createdAt).toBe('number')
        expect(message).toHaveProperty('user', user)
        expect(message).toHaveProperty('text', text)
    })
})

describe('generateLocationMessage', () => {
    it('Should generate correct location object', () => {
        const lat = 1
        const long = 2
        const locationObject = generateLocationMessage('Server', lat, long)
        const  locationMessage = locationObject.url

        expect(locationMessage).toBe(`https://www.google.com.ar/maps?q=${lat},${long}`)
    })
})