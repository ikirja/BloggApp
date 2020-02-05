let mongoose = require('mongoose');

let passwordTokenSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
    expires: 3600
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('PasswordToken', passwordTokenSchema);