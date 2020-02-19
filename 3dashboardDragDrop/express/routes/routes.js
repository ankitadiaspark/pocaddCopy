var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const widgetCtrl = require("../controller/widget");
const widgetGridCtrl = require("../controller/widgetGrid");
const orderCtrl = require("../controller/order");
const orderModel=require('../model/order')
router.get("/widget", widgetCtrl.get);
router.get("/widgetGrid", widgetGridCtrl.get);
router.get("/order", orderCtrl.get);
router.put("/newOrder", orderCtrl.update);
const order=mongoose.model('order')
router.put("/newOrder1",(req,res)=>{
    var update={};
    update[req.body]=req.body.value;
    order.update(
        {order},
        {$set:update},
        function (err,success) {
            if(err) return handleError(err);
        }
    )
})

module.exports = router;
