const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/User.controller')

router.get('/getUser/:id_usuario/:clave', controllerUser.getUser);


module.exports = router;