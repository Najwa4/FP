const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  department: {
    type: String,
  },
  position: {
    type: String,
  },
  jobDescription: {
    type: String,
  },
  jobRequirements: {
    type: String,
  },
  status: {
    type: String,
    enum: ['stateless', 'accepted', 'rejected'],
    default: 'stateless'
  },
  creationDate: {
    type: Date,
    default: Date.now,
  }
});

const announcement = mongoose.model('announcement', announcementSchema);

module.exports = announcement;