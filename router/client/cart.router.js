const express = require('express')
const router = express.Router()

const controller = require("../../controller/client/card.controller");
router.post('/add/:productId',controller.index)
router.get('/',controller.index1)
router.get('/delete/:id',controller.delete)
router.get('/update/:productId/:quantity',controller.update)



module.exports = router