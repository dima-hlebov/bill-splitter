const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config()

const cors = require('cors');

mongoose.promise = global.Promise;

const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'false');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

    if (req.method === 'OPTIONS') {
        return res.status(200).json(({ body: 'OK' }));
    }

    return next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'bill-splitter', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('debug', true);


require('./models/Users');
require('./models/Rooms');
require('./config/passport');
app.use(require('./routes'));

app.listen(8000, () => console.log('Server running on port - 8000'));