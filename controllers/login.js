const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { name, password } = request.body
    const user = await User.findOne({ name })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwordCorrect)) {
        return response.status(401).json({ error: 'Invalid name or password'})
    }

    const userForToken = {
        name: user.name,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })
    response.status(200).send({ token, name: user.name })
})

module.exports = loginRouter