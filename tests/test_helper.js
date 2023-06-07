const User = require('../models/user')

const initialUsers = [
    {
    name: 'firstuser',
    passwordHash: 'firstpassword'
    },
]

const getUsersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    getUsersInDB, initialUsers
}