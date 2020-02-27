const model = require('../model/widgetGrid')

exports.get = (req, res) => {
 model.findAll(req.query)
            .then((result) => {
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
                res.status(200)
                res.send(result)
            })
            .catch((e) => {
                res.send(e)
            })
    
}