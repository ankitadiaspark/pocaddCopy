const model = require('../model/widget')
exports.get = (req, res) => {
 
        model.findAll(req.query)
            .then((result) => {
                res.status(200)
                res.send(result)
            })
            .catch((e) => {
                res.send(e)
            })
    
}