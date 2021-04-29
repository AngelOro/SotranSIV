const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/user.controller')


router.get('/getUser/:usuario/:clave', controllerUser.getUser);

module.exports = router;