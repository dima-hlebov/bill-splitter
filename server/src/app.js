const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config()

const cors = require('cors');

mongoose.promise = global.Promise;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'bill-splitter', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
mongoose.connect(`${process.env.host}://${process.env.user}:${process.env.password}@${process.env.database}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

require('./models/Users');
require('./models/Rooms');
require('./config/passport');
app.use(require('./routes'));

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));

"mongodb+srv://admin:FKppodygZlJ2iPOI@cluster0.dlnou.mongodb.net/billSplitter?retryWrites=true&w=majority"
"mongodb+srv://admin:FKppodygZlJ2iPOI@cluster0.dlnou.mongodb.net/billSplitter?retryWrites=true&w=majority"