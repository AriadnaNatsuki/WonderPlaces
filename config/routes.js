const router = require('express').Router();
const miscController = require('../controllers/misc.controller');
const authController = require('../controllers/auth.controller');
const searchController = require('../controllers/search.controller');

router.get('/', miscController.index);
//Barra busqueda alojamientos
router.get('/:city',searchController.search)

// Register
router.get('/register', authController.register);
router.post('/register', authController.doRegister);

// Login
router.get('/login', authController.login);
router.post('/login', authController.doLogin);

//Alojamientos
router.get('/alojamientos', authController.alojamientos);
//router.post('/alojamientos', authController.doAlojamientos);

//Favoritos
router.get('/favoritos', authController.favoritos);
//router.post('/favoritos', authController.doFavoritos);

//Perfil
router.get('/perfil', authController.perfil);
//router.post('/perfil', authController.doPerfil);

module.exports = router;

