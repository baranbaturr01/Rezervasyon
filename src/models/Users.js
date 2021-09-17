const mongoose = require('mongoose');
//const UserData = require('../dtos/UserData')

const User = new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  }, {
    collection: 'users',
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
module.exports = mongoose.model('User', User)
