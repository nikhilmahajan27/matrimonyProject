const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  date: Date,
  registrations: Number,
  requestsSent: Number,
  requestsAccepted: Number,
  requestsRejected: Number,
});

module.exports = mongoose.model('Report', ReportSchema);
