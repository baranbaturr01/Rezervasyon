const express = require('express')
const router = express.Router()

router.post('/register', require('../src/controller/Auth/Register'))
router.post('/login', require('../src/controller/Auth/Login'))


router.post('/add-seat', require('../src/controller/Seat/AddSeat'))
router.get('/get-seat', require('../src/controller/Seat/GetSeat'))

router.post('/add-shave', require('../src/controller/Shave/AddShave'))
router.get('/get-shave', require('../src/controller/Shave/GetShave'))


router.post('/add-rezervation', require('../src/controller/Rezervation/AddRezervation'))
router.post('/get-rezervation', require('../src/controller/Rezervation/GetRezervations'))


module.exports = router