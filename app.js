require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('mongoya bağlandı')
  const app = express();
  const port=process.env.PORT
  app.use(express.json())
  app.use(express.urlencoded({
    extended: true
  }))

  app.use('/api', require('./routes/rezervasyon'))
  app.use((err, req, res, next) => {

    if (res.headersSent) {
      return next(err)
    }

    if (err.status) {

      const {status, message} = err

      return res.status(status).json({
        message: message
      })

    }

    console.log('else err')
    console.log(err)
    console.log(err.stack)

    return res.status(500).json({
      message: err.toString()
    })

  })
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}).catch(error => {

  console.log('hata')
  console.log(error)
  console.log(error.trace)

})