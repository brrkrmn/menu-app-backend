const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', (request, response) => {
    const body = request.body;

    const user = new User({
        name: body.name,
        password: body.password,
    })

    user.save().then(savedUser => {
        response.json(savedUser)
    })
})

module.exports = usersRouter;