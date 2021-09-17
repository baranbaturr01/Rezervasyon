const isEmpty = require('is-empty')
const createError = require('http-errors')

const Seat = require('../../models/Seats')
const Shave = require('../../models/Shaves')

module.exports = async (req, res, next) => {

  const name = req.body.name
  const seatName = req.body.seat_name
  const shavedIds = req.body.shaved_id

  if (isEmpty(name)) {
    return res.status(400).json({message: 'name bos gecilemez'})
  }

  if (isEmpty(seatName)) {
    return res.status(400).json({message: 'seat_name bos gecilemez'})
  }

  if (isEmpty(shavedIds)) {
    return res.status(400).json({message: 'shave_id bos gecilemez'})
  }

  const seat = new Seat()

  const isShaves = Shave.find({'_id': {$in: [shavedIds]}})
  if ( ! isShaves) {
    return res.status(404).json({message: 'shave bulunamadı'})
  }

  seat.name = name
  seat.seat_name = seatName
  seat.shave_id = shavedIds

  const result = await seat.save()

  if ( ! result) {
    throw new createError.BadRequest('kayit sirasinda bir hata olustu')
  }
  return res.json({success: true})


}