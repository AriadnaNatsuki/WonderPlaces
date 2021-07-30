const router = require('express').Router();
const miscController = require('../controllers/misc.controller');
const authController = require('../controllers/auth.controller');
const searchController = require('../controllers/search.controller');
const infoController = require('../controllers/info.controller');

router.get('/', miscController.index);

// Register
router.get('/register', authController.register);
router.post('/register', authController.doRegister);

// Login
router.get('/login', authController.login);
router.post('/login', authController.doLogin);

//Alojamientos

router.get('/alojamientos', searchController.search);
router.get('/info/:placeId', infoController.info);

//router.post('/alojamientos', authController.doAlojamientos);


//Perfil
router.get('/perfil', authController.perfil);
//router.post('/perfil', authController.doPerfil);
router.get('/activate/:token', authController.activateAccount)

module.exports = router;

