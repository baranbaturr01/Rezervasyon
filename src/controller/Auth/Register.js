const isEmpty = require('is-empty')
const Helper = require('../../../src/services/Helper')

const User = require('../../models/Users')

module.exports = (req, res, next) => {

  const firstName = req.body.first_name
  const lastName = req.body.last_name
  const email = req.body.email
  const phone = req.body.phone
  const password = req.body.password

  if (isEmpty(firstName)) {
    return res.status(400).json({message: 'first_name boş geçilemez'})
  }
  if (isEmpty(lastName)) {
    return res.status(400).json({message: 'lastName boş geçilemez'})
  }
  if (isEmpty(email)) {
    return res.status(400).json({message: 'email boş geçilemez'})
  }
  if (isEmpty(phone)) {
    return res.status(400).json({message: 'phone boş geçilemez'})
  }
  if (isEmpty(password)) {
    return res.status(400).json({message: 'password boş geçilemez'})
  }

  const helper = new Helper()
  const hashedPass = helper.encryptPassword(password, process.env.APP_SECRET_KEY)

  return User.findOne({email: email}).then(result => {
    if (result) {
      return res.status(400).json({message: 'email zaten kayıtlı'})
    }

    const user = new User()
    user.first_name = firstName
    user.last_name = lastName
    user.email = email
    user.phone = phone
    user.password = hashedPass

    return user.save().then(data => {
      if ( ! data) {
        return res.status(500).json({message: 'kayıt sırasında bir hata meydana geldi'})
      }
      return res.json({
        success: true
      })
    })
  })

}