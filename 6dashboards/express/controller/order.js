const model = require("../model/order");
const mongoose = require("mongoose");
const joi = require("@hapi/joi");
joi.objectId = require("joi-objectid")(joi);
exports.get = (req, res) => {
  model
    .findAll(req.query)
    .then(result => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
      res.status(200);
      res.send(result);
    })
    .catch(e => {
      res.send(e);
    });
};

exports.update = (req, res) => {
  const { error } = joi.validate(req.params);
  if (error) {
    res.status(400);
    res.send(error);
  } else {
    let body = req.body;
    const schema = {
      ids: joi.array().items(joi.number())
    };
    const { error } = joi.validate(body, schema);
    if (error) {
      res.status(400);
      res.send(error);
    } else {
      model
        .updateData(req.params, req.body)
        .then(response => {
          res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
          res.status(200);
          res.send(response);
        })
        .catch(err => {
          res.status(400);
          res.send(err);
        });
    }
  }
};
