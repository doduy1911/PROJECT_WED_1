const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/chat.controller")
const validate = require("../../validates/client/register.validates")


router.get("/",validate.auth,controller.index)

module.exports = router;