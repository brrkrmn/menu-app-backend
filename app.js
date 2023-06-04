const config = require('./utils/config')
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const middleware = require('./utils/middleware');

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
app.use('/api/users', usersRouter);
app.use(middleware.errorLogger);

module.exports = app