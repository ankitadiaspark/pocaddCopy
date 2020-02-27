const mongoose = require('mongoose');
const widgetSchema = new mongoose.Schema({
    id: {
        type: String,
       required:true
    },
    name: {
        type: Array,
      required:true
    },
    dataValue: {
        type: Array,
        required:true
    },

    format: {
        type: String,
        required:true
    }
});

let widget = mongoose.model('widget', widgetSchema);

exports.findAll = (data) => {
    return new Promise((resolve, reject) => {
        widget.find(data)
            .then((res) => {
                return resolve(res)
            })
            .catch((err) => {
                let badResponse = {
                    message: "Data Not Found",
                    error: err
                }
                return reject(badResponse)
            })
    })
}

