const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: { type: String, default: 'active' },
});

module.exports = mongoose.model('User', UserSchema);
