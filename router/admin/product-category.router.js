const express = require("express");
const multer  = require('multer')

// const cloudinary = require('cloudinary').v2
// const streamifier = require('streamifier')


const router = express.Router()
const storageMulterHelper = require("../../helper/storageMulter")
// const storage = storageMulterHelper()
const upload = multer()
const validates = require("../../validates/admin/product.validates")
// cloudinary.config({ 
//     cloud_name: "dnqvho7ya", 
//     api_key: "672218342959955", 
//     api_secret: "Dm_S1JVyU9oS25e2jshT2J0VFFI" // Click 'View Credentials' below to copy your API secret
// });

const uploadCloud = require('../../middllewares/admin/uploadcloud.js')


const controller = require("../../controller/admin/product-category.controller");
router.get("/",controller.index);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti);
router.delete("/delete/:id",controller.deleteItem);
// router này lấy ra giao diện
router.get("/create",controller.create);
// router này là router submid form
router.post(
    "/create",upload.single('thumbnail'),
    uploadCloud.upload,
    validates.createPost,
    controller.createPost
    );
// router nyaf là router chỉnh sửa
router.get("/edit/:id",controller.edit)
router.patch(
    "/edit/:id",upload.single('thumbnail'),
    uploadCloud.upload,
    validates.createPost,
    controller.editPatch
    );

router.get("/detail/:id",controller.detail);

// được rồi này. Tắt bỏ cái tự save đi em, k nên dùng


module.exports= router
