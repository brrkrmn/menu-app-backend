const requestLogger = (request, response, next) => {
    console.log('Method: ', request.method);
    console.log('Path: ', request.path);
    console.log('Body: ', request.body);
    next();
}

const errorLogger = (error, request, response, next) => {
    console.log('Error: ', error.message);
    next(error);
}

module.exports = {
    requestLogger,
    errorLogger,
}