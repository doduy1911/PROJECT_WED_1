const express = require("express");
const rolesController = require("../../controller/admin/roles.controller")
const router = express.Router()
router.get("/",rolesController.index);
router.get("/create",rolesController.create);
router.post("/create",rolesController.createPost);
router.get("/edit/:id",rolesController.edit);
router.patch("/edit/:id",rolesController.editPatch);
router.get("/delete/:id",rolesController.delete);








module.exports= router
