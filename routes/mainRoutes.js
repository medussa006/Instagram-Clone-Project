const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController') 
const { ensureAuth, ensureGuest } = require('../middlewares/auth')

router.get('/',ensureAuth, mainController.getHome)
router.get('/profile', mainController.getProfile)
router.get('/login', mainController.getLogin)
router.post('/login', mainController.postLogin)
router.get('/logout', mainController.logout)
router.get('/signup', mainController.getSignUp)
router.post('/signup', mainController.postSignUp)
router.get("/search", mainController.searchProfile)

module.exports = router