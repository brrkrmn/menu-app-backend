const config = require('./utils/config')
const express = require('express');
require('express-async-errors')
const app = express();
const cors = require('cors');
const signupRouter = require('./controllers/signup');
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
console.log('Connecting to MONGODB...');

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB: ', error.message)
    });

app.use(cors());
app.use(express.static('build'))
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/signup', signupRouter);
app.use('/api/login', loginRouter);

app.use(middleware.errorHandler);

module.exports = app