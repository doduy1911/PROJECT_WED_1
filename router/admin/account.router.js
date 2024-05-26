const express = require("express");
const multer  = require('multer')

const router = express.Router()
const upload = multer()
const uploadCloud = require('../../middllewares/admin/uploadcloud.js')


const controller = require("../../controller/admin/account.controller");
router.get("/",controller.index);
router.get("/create",controller.create);
router.post("/create",upload.single('avatar'),
uploadCloud.upload,controller.createPost);

router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",upload.single('avatar'),
uploadCloud.upload,controller.editPost);





// được rồi này. Tắt bỏ cái tự save đi em, k nên dùng


module.exports= router