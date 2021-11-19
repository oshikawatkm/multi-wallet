const mongoose = require('mongoose');

const HLindyWalletSchema = new mongoose.Schema({
  did: {
    type: String,
    unique: true,
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
    unique: true
  },
  schema_id: {
    type: String,
    required: true,
  },
  cred_def_id: {
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
  }
})

module.exports = mongoose.model('wallet', HLindyWalletSchema)