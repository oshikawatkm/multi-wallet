const mongoose = require('mongoose');

const HLindyWalletSchema = new mongoose.Schema({
  did: {
    type: String
  },
  tag: {
    type: String,
    required: true,
  },
  vc_id: {
    type: String,
    required: true,
  },
  pres_ex_id: {
    type: String,
  },
  connection_id: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ['issued', 'request-sent', 'request-received', 'accepted', 'presentation-sent', 'presentation-received', 'done'],
    require: true
  },
  verified: {
    type: Boolean,
    default: false,
    require: true
  },
})

module.exports = mongoose.model('wallet', HLindyWalletSchema)