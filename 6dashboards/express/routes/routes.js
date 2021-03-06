var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const widgetCtrl = require("../controller/widget");
const widgetGridCtrl = require("../controller/widgetGrid");
const orderCtrl = require("../controller/order");
router.get("/widget", widgetCtrl.get);
router.get("/widgetGrid", widgetGridCtrl.get);
router.get("/order", orderCtrl.get);
router.put("/order", orderCtrl.update);
module.exports = router;
