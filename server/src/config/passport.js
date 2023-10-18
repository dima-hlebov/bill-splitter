const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = mongoose.model('Users');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  Users.findOne({ email })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'User with such email doesn\'t exist.' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Password is invalid.' });
      }
      return done(null, user);
    }).catch(done);
}));