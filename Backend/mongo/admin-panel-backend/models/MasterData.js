const mongoose = require('mongoose');

const MasterDataSchema = new mongoose.Schema({
  category: String,
  name: String,
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model('MasterData', MasterDataSchema);
