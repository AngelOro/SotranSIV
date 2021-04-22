const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/User.controller')


router.get('/', controllerUser.getUsers);


module.exports = router;