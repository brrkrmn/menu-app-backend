const bcrypt = require('bcrypt')
const signupRouter = require('express').Router();
const User = require('../models/user');

signupRouter.post('/', async (request, response) => {
    const { name, password } = request.body
    if (!password) {
        return response.status(400).json({ error: 'password is missing' })
    } else if (password.length < 6) {
        return response.status(400).json({ error: 'password must be at least 6 characters' })
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
        name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = signupRouter;