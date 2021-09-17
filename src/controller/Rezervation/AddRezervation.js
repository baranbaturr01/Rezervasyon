const isEmpty = require('is-empty')
const jwt = require("jsonwebtoken")
const User = require("../../models/Users")
const Rezervations = require("../../models/Rezervations")


module.exports = async (req, res, next) => {

  const seatId = req.body.seat_id
  const startAt = req.body.start_at
  const endAt = req.body.end_at
  const date = req.body.date
  const token = req.header('X-Token')

  if (isEmpty(seatId)) {
    return res.status(404).json({message: 'seat_id boş geçilemez'})
  }
  if (isEmpty(startAt)) {
    return res.status(404).json({message: 'startAt boş geçilemez'})
  }
  if (isEmpty(endAt)) {
    return res.status(404).json({message: 'endAt boş geçilemez'})
  }
  if (isEmpty(date)) {
    return res.status(404).json({message: 'date boş geçilemez'})
  }
  if (isEmpty(token)) {
    return res.status(404).json({message: 'token boş geçilemez'})
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
  const rezervation = new Rezervations()
  rezervation.date = date
  rezervation.start_at = startAt
  rezervation.end_at = endAt
  rezervation.seat_id = seatId
  rezervation.user_id = userId
  const result = await rezervation.save()
  if ( ! result) {
    return res.status(500).json({message: 'kayıt eklenemedi'})
  }

  return res.json({success: true})

}