const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {
    let users

    beforeEach(() => {
        users = new Users()
        users.users = [{
            id: 1,
            name: 'Mike',
            room: 'node course'
        },
        {
            id: 2,
            name: 'Jen',
            room: 'react course'
        },
        {
            id: 3,
            name: 'Julie',
            room: 'node course'
        }]
    })

    it ('Should add new user', () => {
        const users = new Users()
        const user = {
            id: 123,
            name: 'Lisandro',
            room: 'papitas'
        }
        const response = users.addUser(user.id, user.name, user.room)

        expect(users.users).toEqual([user])
    })

    it('Should remove a user', () => {
        const removedUser = users.removeUser(1)
        expect(users.users).toEqual([{
                id: 2,
                name: 'Jen',
                room: 'react course'
            },
            {
                id: 3,
                name: 'Julie',
                room: 'node course'
            }])
        expect(removedUser).toEqual({
            id: 1,
            name: 'Mike',
            room: 'node course'
        })
    })

    it('Should not remove a user', () => {
        const removedUser = users.removeUser(0)
        expect(users.users).toEqual([{
            id: 1,
            name: 'Mike',
            room: 'node course'
        },
        {
            id: 2,
            name: 'Jen',
            room: 'react course'
        },
        {
            id: 3,
            name: 'Julie',
            room: 'node course'
        }])
        expect(removedUser).toEqual('User not found')
    })

    it('Should find user', () => {
        expect(users.getUser(2)).toEqual({
            id: 2,
            name: 'Jen',
            room: 'react course'
        })
    })

    it('Should not find user', () => {
        expect(users.getUser(0)).toEqual('User not found')
    })

    it ('Should return names for node course', () => {
        const userList = users.getUserList('node course')

        expect(userList).toEqual(['Mike', 'Julie'])
    })

    it ('Should return names for react course', () => {
        const userList = users.getUserList('react course')

        expect(userList).toEqual(['Jen'])
    })
})