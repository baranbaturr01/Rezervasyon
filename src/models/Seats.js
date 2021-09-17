const mongoose = require('mongoose');

const Seat = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    seat_name: {
      type: String,
      required: true
    },
    shave_id: {
      type: Array,
      required: true,
    },
  }, {
    collection: 'seats',
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
module.exports = mongoose.model('Seat', Seat)
