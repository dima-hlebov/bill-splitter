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

mongoose.connect('mongodb+srv://admin:FKppodygZlJ2iPOI@cluster0.dlnou.mongodb.net/billSplitter?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('debug', true);

require('./models/Users');
require('./models/Rooms');
require('./config/passport');
app.use(require('./routes'));

app.get('/payment', (req, res, next) => {
    var LiqPay = require('liqpay-sdk');
    var liqpay = new LiqPay('sandbox_i62052253639', 'sandbox_dJfnLjRYyF8gBnzXZAxLUy36RyDMDEp2YCchSizU');
    var reqObject = liqpay.cnb_object({
    'action'         : 'p2p',
    'amount'         : '1',
    'currency'       : 'UAH',
    'description'    : 'description text',
    'order_id'       : 'order_id_1',
    'version'        : '3'
    })
  
    console.log(reqObject);
  });


app.listen(8000, () => console.log('Server running on http://localhost:8000/'));