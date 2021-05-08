const express = require('express')
const router = express.Router()
const controllerRoute = require('../controllers/route.controller')


router.get('/', controllerRoute.getRoute);
//router.post('/create',controllerShipping.postShipping);
router.get('/cityRoute', controllerRoute.getCityRoute);
router.get('/vehicleRoute', controllerRoute.getVehicleRoute);
router.get('/editRoute/:id_ruta',controllerRoute.editRoute);
router.get('/stateRoute', controllerRoute.getStateRoute);
router.get('/conductRoute', controllerRoute.getConductRoute);

router.post('/newRoute', controllerRoute.insertRoute);
router.post('/deleteRoute',controllerRoute.deleteRoute);
router.put('/routeEdit/:id_ruta', controllerRoute.routeEdit);



module.exports = router;