const createError = require('http-errors')
const isEmpty = require('is-empty')
const jwt = require('jsonwebtoken')

const User = require('../../models/Users')
const Seat = require('../../models/Seats')
const Shave = require('../../models/Shaves')


module.exports = async (req, res, next) => {

  const token = req.header('X-Token')

  if (isEmpty(token)) {
    return res.status(400).json({message: 'name bos gecilemez'})
  }

  const decoded = jwt.verify(token, process.env.APP_SECRET_KEY)
  if ( ! decoded) {
    return res.status(400).json({message: 'token çözülemedi'})
  }
  const userId = jwt.decode(token).user_id

  const user = await User.findById(userId)
  if ( ! user) {
    return res.status(400).json({message: 'user bulunamadı'})
  }

  const seats = await Seat.find()
  const shaves = await Shave.find()
  const shaveId = seats.shave_id
  const shave = await Seat.aggregate([
    {
      $lookup: {
        from: 'shaves',
        localField: 'shave_id',
        foreignField: '_id',
        as: 'shaves'
      }
    }])

  return res.json({
    shaves: shaves,
    items: seats
  })
}