const express = require("express");
const rolesController = require("../../controller/admin/roles.controller")
const router = express.Router()
router.get("/",rolesController.index);
router.get("/create",rolesController.create);
router.post("/create",rolesController.createPost);




module.exports= router
