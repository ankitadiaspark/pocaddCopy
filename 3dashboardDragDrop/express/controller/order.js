const model = require("../model/order");
exports.get = (req, res) => {
  model
    .findAll(req.query)
    .then(result => {
      res.status(200);
      res.send(result);
    })
    .catch(e => {
      res.send(e);
    });
};

exports.update = (req, res) => {
  let body = req.body;
  console.log(req.body, "body");
  console.log(req.params, "params");

  model
    .updateData(req.params, req.body)
    .then(response => {
      res.status(200);
      res.send(response);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
};
