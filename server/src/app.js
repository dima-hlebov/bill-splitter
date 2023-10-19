const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config()

const cors = require('cors');

mongoose.promise = global.Promise;

const app = express();

app.use(cors({
    origin: '*',
    preflightContinue: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
}));

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