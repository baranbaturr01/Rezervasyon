const mongoose = require('mongoose');

const Rezervations = new mongoose.Schema({
    date: {
      type: String,
      required: true,
    },
    start_at: {
      type: String,
      required: true
    },
    end_at: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  seat_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  }, {
    collection: 'rezervations',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)
/*
 User.virtual('vData').get(function () {
 return new UserData(this.data)
 })*/
module.exports = mongoose.model('Rezervations', Rezervations)
