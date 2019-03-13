// addUser(id,name, room)
// removeUser(id)
// getUser(id)
//getUserList(room)

class Users {
    constructor () {
        this.users = []
    }
    addUser (id, name, room) {
        const user = {id, name, room}
        this.users.push(user)
        return user
    }
    removeUser (id) {
        const removedUser = this.getUser(id)
        if (typeof removedUser === 'object') {
            const removedUserIndex = this.users.map((user) => user.id).indexOf(removedUser.id)
            const removed = this.users.splice(removedUserIndex,1)
            return removed[0]
        } else {
            return 'User not found'
        }
    }
    getUser (id) {
        const user = this.users.find((user) => user.id === id )
        return user? user : 'User not found'
    }
    getUserList (room) {
        const users = this.users.filter((user) => user.room === room)
        var namesArray = users.map((user) => user.name)
        return namesArray
    }
}

module.exports = { Users }