const express = require('express')
const router = express.Router()

const controller = require("../../controller/client/checkout.controller");
router.get('/',controller.index)
router.post('/order',controller.orderPost)
router.get(`/success/:id`,controller.success)




module.exports = router