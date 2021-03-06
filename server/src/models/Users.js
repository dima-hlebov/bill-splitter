const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const {Schema} = mongoose;

const UsersSchema = new Schema({
    hash: String,
    salt: String,
    firstName: String,
    secondName: String,
    email: String,
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rooms"
      }
    ]
});

UsersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);
  console.log(parseInt(expirationDate.getTime() / 1000, 10))
  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UsersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    secondName: this.secondName,
    token: this.generateJWT(),
  };
};

mongoose.model('Users', UsersSchema);