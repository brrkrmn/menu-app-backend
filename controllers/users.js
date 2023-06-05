const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', (request, response, next) => {
    const body = request.body;

    const user = new User({
        name: body.name,
        password: body.password,
    })

    user.save()
        .then(savedUser => {
            response.json(savedUser)
        })
        .catch(error => next(error))
})

module.exports = usersRouter;