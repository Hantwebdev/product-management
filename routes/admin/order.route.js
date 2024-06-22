const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/order.controller");

router.get("/", controller.order);

router.patch("/change-status/:id/:status", controller.changeStatus);

module.exports = router;