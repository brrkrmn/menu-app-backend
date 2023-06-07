const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialUsers = [
    {
    name: 'firstuser',
    password: 'firstpassword'
    },
]

const getUsersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const clearDB = async () => {
    await User.deleteMany({})    
}

const addTestUserToDB = async () => {
    const user = initialUsers[0]
    const passwordHash = await bcrypt.hash(user.password, 10)
    const newUser = new User({ name: user.name, passwordHash: passwordHash})
    await newUser.save()
}

module.exports = {
    getUsersInDB, initialUsers, clearDB, addTestUserToDB
}