const isEmpty = require('is-empty')
const createError = require('http-errors')

const Shave = require('../../models/Shaves')

module.exports = async (req, res, next) => {

  const type = req.body.type
  const time = req.body.time

  if (isEmpty(type)) {
    return res.status(400).json({message: 'type bos gecilemez'})
  }

  if (isEmpty(time)) {
    return res.status(400).json({message: 'time bos gecilemez'})
  }

  const shave = new Shave()
  
  shave.type = type
  shave.time = time

  const result = await shave.save()
  if ( ! result) {
    return res.status(400).json({message: 'kayıt sırasında bir hata meydana geldi'})
  }
  return res.json({success: true})

}