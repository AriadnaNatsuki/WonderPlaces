const router = require('express').Router();
const miscController = require('../controllers/misc.controller');
const authController = require('../controllers/auth.controller');
const searchController = require('../controllers/search.controller');
const infoController = require('../controllers/info.controller');
const passport=require('passport')
//const upload=require (./storage.config)

//Parametros que quiero que google se traiga con mi app
const GOOGLE_SCOPES=[
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'

]


router.get('/', miscController.index);

// Register
router.get('/register', authController.register);
router.post('/register', authController.doRegister);

// Login
router.get('/login', authController.login);
router.post('/login', authController.doLogin);

//Login google
//endpoint donde llamaremos al metodo authenticate y le pasaremos el nombre de nuestra estrategia: google-auth
router.get('/auth/google',passport.authenticate('google-auth', {scope: GOOGLE_SCOPES}))
router.get('/authenticate/google/callback', authController.doLoginGoogle)

//Alojamientos

router.get('/alojamientos', searchController.search);
router.get('/info/:placeId', infoController.info);

//router.post('/alojamientos', authController.doAlojamientos);


//Perfil
router.get('/perfil', authController.perfil);
//router.post('/perfil', authController.doPerfil);
router.get('/activate/:token', authController.activateAccount)

module.exports = router;

