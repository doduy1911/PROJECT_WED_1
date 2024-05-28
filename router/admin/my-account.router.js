const express = require("express");
const router = express.Router()
const multer  = require('multer')
const upload = multer()
const validates = require("../../validates/admin/product.validates")
const uploadCloud = require('../../middllewares/admin/uploadcloud.js')
const controller = require("../../controller/admin/my-account.controller");


router.get("/",controller.index);
router.get("/edit",controller.edit);
router.patch("/edit",upload.single('avatar'),
uploadCloud.upload,
validates.createPost,
controller.editPatch);



module.exports = router;