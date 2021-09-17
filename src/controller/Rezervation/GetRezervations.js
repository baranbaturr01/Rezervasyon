const isEmpty = require('is-empty')
const jwt = require("jsonwebtoken")
const User = require("../../models/Users")
const Rezervations = require("../../models/Rezervations")
const Shaves = require("../../models/Shaves")

module.exports = async (req, res, next) => {

  const token = req.header('X-Token')
  const seatId = req.body.seat_id
  const date = req.body.date

  if (isEmpty(token)) {
    return res.status(404).json({message: 'seat_id boş geçilemez'})
  }

  if (isEmpty(seatId)) {
    return res.status(404).json({message: 'seat_id boş geçilemez'})
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

  const rezervations = await Rezervations.find({seat_id: seatId, date: date})
  const shaves = await Shaves.find()

  const shavesArr = []
  shaves.forEach(shave => {
    shavesArr.push({
      id: shave._id,
      type: shave.type
    })
  })

  let times = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']; // time array

  if ( ! rezervations) {
    return res.json({items: times})
  }

  let newTimes = []
  times.forEach((element, index, array) => {
    let isMatch = false
    const thisTime = new Date(2021, 1, 1, element.split(':')[0], element.split(':')[1])
    let nextTime = thisTime

    if (array[index + 1]) {
      nextTime = new Date(2021, 1, 1, array[index + 1].split(':')[0], array[index + 1].split(':')[1])
    }

    rezervations.forEach(rezervation => {
      const rezervationTime = new Date(2021, 1, 1, rezervation.start_at.split(':')[0], rezervation.start_at.split(':')[1])
      //şu an ki eleman ile bir sonraki eleman arasında ise bu elemanı uçuralım
      if (rezervationTime.getTime() > thisTime.getTime() && rezervationTime.getTime() < nextTime.getTime()) {
        isMatch = true
      }
      if (rezervationTime.getTime() === thisTime.getTime()) {
        isMatch = true
      }
    })
    if ( ! isMatch) {
      newTimes.push(element)
    }
  })


  return res.json({
    items: newTimes.map(item => {
      return {
        shaves: shavesArr,
        rezervatred: {

          start_at: item[0] == '0' ? item.substr(1, item.length) : item,

          end_at: parseInt(item.split(':')[0]) + 1 + ':00'
        }
      }
    })
  })
}