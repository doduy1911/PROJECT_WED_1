const express = require("express");
const router = express.Router()

const controller = require("../../controller/admin/dashboard.controller");
router.get("/",controller.dashboard);

// được rồi này. Tắt bỏ cái tự save đi em, k nên dùng


module.exports= router