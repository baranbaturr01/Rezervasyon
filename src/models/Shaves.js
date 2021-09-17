const mongoose = require('mongoose');

const Shaves = new mongoose.Schema({
    type: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true
    }
  }, {
    collection: 'shaves',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)
module.exports = mongoose.model('Shaves', Shaves)
