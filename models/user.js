var mongoose = require('mongoose');
var bycrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;
/**
 * The user schema attributes / characterstics/ fields 
 */

var UserSchema = new Schema({

  email: { type: String, unique: true, lowercase: true},
  password: String,

  profile: {
    name: { type: String, default: ''},
    picture: { type: String, default: ''}
  },

  address: String,
  history: [{
    date: Date,
    paid: { type: Number, default: 0},
    // item: { type: Schema.Types.ObjectId, ref: ''}
  }]
});
/* 
* Hash the password before we even save it to the database 
*/

UserSchema.pre('save', function(next){
  var user = this;
  if(!user.isModified('password')) return next();
  bycrypt.genSalt(10, function(err, salt){
    if(err) return next(err);
    bycrypt.hash(user.password, salt, null, function(err, hash){
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/* 
* Compare password in the database and the one that the user type in
*/

UserSchema.methods.comparePassword = function(password){
  return bycrypt.compareSync(password, this.password);
}

/**
 * Gravatar API
 */

UserSchema.methods.gravatar = function(size) {
  if (!this.size) size = 200;
  if (!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
}

module.exports = mongoose.model('User', UserSchema);