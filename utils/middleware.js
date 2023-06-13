const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method);
    console.log('Path: ', request.path);
    console.log('Body: ', request.body);
    next();
}

const errorHandler = (error, request, response, next) => {
    console.log('Error: ', error.message);

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'token expired' })
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (!authorization) {
        return response.status(401).json({ error: 'Unauthorized' })
    } else if (authorization && authorization.startsWith('bearer ')) {
        const token = authorization.replace('bearer ', '')
        request.token = token
    }
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'invalid token' })
    }
    const user = await User.findById(decodedToken.id)
    request.user = user
    next()
}

module.exports = {
    requestLogger,
    errorHandler,
    tokenExtractor,
    userExtractor,
}