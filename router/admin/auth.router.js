const express = require("express");
const router = express.Router()

const controller = require("../../controller/admin/auth.controller");
router.get("/login",controller.index);
router.post("/login",controller.indexPost);


// được rồi này. Tắt bỏ cái tự save đi em, k nên dùng


module.exports= router