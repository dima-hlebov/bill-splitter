const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

router.post('/signup', auth.optional, async (req, res, next) => {
  const { body: user } = req;

  if (!user.email) {
    return res.status(422).json({
      error: 'Email is required'
    });
  }

  if (!user.password) {
    return res.status(422).json({
      error: 'Password is required',
    });
  }

  const foundUser = await Users.findOne({ email: user.email });

  if (foundUser) {
    return res.status(400).json({
      error: 'Email is already in use'
    });
  } else {
    const newUser = new Users(user);
    newUser.setPassword(user.password);
    return newUser.save()
      .then(() => res.json({ user: newUser.toAuthJSON() }));
  }
});

router.post('/signin', auth.optional, (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const { body: user } = req;

  if (!user.email) {
    return res.status(422).json({
      error: 'Email is required'
    });
  }

  if (!user.password) {
    return res.status(422).json({
      error: 'Password is required'
    });
  }

  return passport.authenticate('local', { session: false, failureFlash: true }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(400).json({
        error: info.message
      })
    }
  })(req, res, next);
});

module.exports = router;