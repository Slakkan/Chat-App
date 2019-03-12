const expect = require('expect')

const { generateMessage } = require('./message')


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