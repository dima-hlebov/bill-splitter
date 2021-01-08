const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

const cors = require('cors');

mongoose.promise = global.Promise;

const app = express();

app.use(cors());
// app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'bill-splitter', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

mongoose.connect('mongodb://localhost/bill-splitter', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

require('./models/Users');
require('./models/Rooms');
require('./config/passport');
app.use(require('./routes'));

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));