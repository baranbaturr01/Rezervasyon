const isEmpty = require('is-empty')
const jwt = require("jsonwebtoken");
const User = require("../../models/Users");
const Shave = require('../../models/Shaves')

module.exports = async (req, res, next) => {

  const token = req.header('X-Token')

  if (isEmpty(token)) {
    return res.status(400).json({message: 'token bos geçilemez'})
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

  const shaves = await Shave.find()

  return res.json({items: shaves})

}