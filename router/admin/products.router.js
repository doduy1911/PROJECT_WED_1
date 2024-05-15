const express = require("express");
const multer  = require('multer')
const router = express.Router()
const storageMulterHelper = require("../../helper/storageMulter")
const storage = storageMulterHelper()
const upload = multer({ storage: storage })
const validates = require("../../validates/admin/product.validates")

const controller = require("../../controller/admin/products.controller");
router.get("/",controller.index);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/change-multi",controller.changeMulti);
router.delete("/delete/:id",controller.deleteItem);
// router này lấy ra giao diện
router.get("/create",controller.create);
// router này là router submid form
router.post(
    "/create",upload.single('thumbnail'),
    validates.createPost,
    controller.createPost
    );
// router nyaf là router chỉnh sửa
router.get("/edit/:id",controller.edit)
router.patch(
    "/edit/:id",upload.single('thumbnail'),
    validates.createPost,
    controller.editPatch
    );

router.get("/detail/:id",controller.detail);

// được rồi này. Tắt bỏ cái tự save đi em, k nên dùng


module.exports= router
