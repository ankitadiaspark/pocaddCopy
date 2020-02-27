var express = require("express");
var bodyParser=require("body-parser")
require("./express/connection/connection");
var indexRouter = require("./express/routes/routes");
var router = express.Router();
const mongoose = require("mongoose");
var path = require("path");
var cors=require('cors');
var app = express();

var cor=require('./express/helper/cors')
app.use(cor.allowCrossDomain);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.listen(5000, function() {
  console.log("Server Run At : http://localhost:5000");
});
module.exports = app;
