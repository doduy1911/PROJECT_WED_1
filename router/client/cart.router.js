const express = require('express')
const router = express.Router()

const controller = require("../../controller/client/card.controller");
router.post('/add/:productId',controller.index)

module.exports = router