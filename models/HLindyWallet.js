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
    required: true,
  },
  connection_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['await', 'request', 'accepted', 'started'],
    require: true
  }
})

module.exports = mongoose.model('wallet', HLindyWalletSchema)