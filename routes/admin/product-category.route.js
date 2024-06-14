const express = require("express");
const multer = require('multer');
const router = express.Router();

const controller = require("../../controllers/admin/product-category.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();
const validate = require("../../validates/admin/product-category.validate");

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.get("/create", controller.create);

router.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch
);

router.delete("/delete/:id", controller.delete)

module.exports = router;