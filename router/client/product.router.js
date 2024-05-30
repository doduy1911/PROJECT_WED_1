const express = require("express");
const router = express.Router()
const controller = require("../../controller/client/product.controller");
router.get("/",controller.index)
router.get("/detail/:slug",controller.detail)
router.get("/:slug",controller.category)



module.exports= router