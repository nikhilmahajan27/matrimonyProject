const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  name: String,
  features: [String],
});

module.exports = mongoose.model('Package', PackageSchema);
