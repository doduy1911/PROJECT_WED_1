const express = require('express')
const router = express.Router()
const validate = require("../../validates/client/register.validates")
const controller = require("../../controller/client/user.controller");

router.get('/register',controller.register)
router.post('/register',validate.createPost,controller.registerPost)


module.exports = router