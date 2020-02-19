var express = require("express");
require("./express/connection/connection");
var indexRouter = require("./express/routes/routes");
var router = express.Router();
const mongoose = require("mongoose");
var path = require("path");
// var cors=require('./express/helper/cors')
var cors=require('cors');
var app = express();
app.use("/", indexRouter);
// var corsOptions = {
//   origin: 'http://localhost:4200',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(corsOptions,cors())
// app.use(cors.allowCrossDomain())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.listen(5000, function() {
  console.log("Server Run At : http://localhost:5000");
});
module.exports = app;
