const model = require("../model/order");
const joi = require('@hapi/joi');
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
   
        let body = req.body
        console.log(body,"body")
        const schema = {
            ids: joi.array()
           };
        const { error } = joi.validate(body, schema);
        console.log(body,"body1")
        console.log(schema,"schema")
        if (error) {
            res.status(400)
            res.send(error)
        }
        else {
            model.updateData(req.params, req.body)
                .then((response) => {
                    res.status(200);
                    res.send(response)
                })
                .catch((err) => {
                    res.status(400);
                    res.send(err)
                })
        }
    
}