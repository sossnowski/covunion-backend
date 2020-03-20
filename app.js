const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
});

// mongoose.Promise = global.Promise;

const infoRoutes = require('./api/routes/info');
const userRoutes = require('./api/routes/user');
const ideaRoutes = require('./api/routes/idea');
const voteRoutes = require('./api/routes/vote');
const advertisementRoutes = require('./api/routes/advertisement');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST');
        return res.status(200).json({});
    }
    next();

});

app.use('/info', infoRoutes);
app.use('/user', userRoutes);
app.use('/idea', ideaRoutes);
app.use('/vote', voteRoutes);
app.use('/advertisement', advertisementRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;