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
    }
    next(error)
}

module.exports = {
    requestLogger,
    errorHandler,
}