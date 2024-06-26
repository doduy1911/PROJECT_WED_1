const express = require('express')
const router = express.Router()
const validate = require("../../validates/client/register.validates")
const controller = require("../../controller/client/user.controller");

router.get('/register',controller.register)
router.post('/register',validate.createPost,controller.registerPost)
router.get('/loign',controller.loign)
router.post('/loign',controller.loignPost)
router.get('/logout',controller.logout)
router.get('/password/forgot',controller.forgot)
router.post('/password/forgot',validate.forgotPassword,controller.forgotPost)
router.get('/password/otp',controller.otp)
router.post('/password/otp',controller.otpPost)
router.get('/password/reset',controller.reset)
router.post('/password/reset',validate.forgotPasswordPost,controller.resetPost)
router.get('/info',controller.info)







 




module.exports = router