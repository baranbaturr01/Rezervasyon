const isEmpty = require('is-empty')
const jwt = require('jsonwebtoken')

const User = require('../../models/Users')

const Helper = require('../../services/Helper')


module.exports = (req, res, next) => {

  const email = req.body.email
  const password = req.body.password

  if (isEmpty(email)) {
    return res.status(400).json({message: 'email boş geçilemez'})
  }
  if (isEmpty(password)) {
    return res.status(400).json({message: 'password boş geçilemez'})
  }

  return User.findOne({email: email}).then(user => {
    if ( ! user) {
      return res.status(404).json({message: 'Kullanıcı bulunamadı'})
    }
    const decPass = new Helper().decryptPassword(user.password, process.env.APP_SECRET_KEY)

    if (decPass !== password) {
      return res.status(400).json({message: 'email veya şifre bilgisi hatalı'})
    }
    return jwt.sign({user_id: user.id}, process.env.APP_SECRET_KEY, {expiresIn: '2w'}, (err, token) => { //2 haftalık token verildi
      if (err) {
        return res.status(500).json({message: 'Hata :' + err})
      }
      return res.json({token: token})
    })


  })

}