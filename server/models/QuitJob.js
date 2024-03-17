const mongoose = require('mongoose');

const quitJobSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resignationDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const QuitJob = mongoose.model('QuitJob', quitJobSchema);

module.exports = QuitJob;