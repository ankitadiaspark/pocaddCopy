const mongoose = require("mongoose");
const orderschema = new mongoose.Schema({
  ids: {
    type: Array,
    required: true
  }
});

let order = mongoose.model("order", orderschema);

exports.findAll = data => {
  return new Promise((resolve, reject) => {
    order
      .find(data)
      .then(res => {
        return resolve(res);
      })
      .catch(err => {
        let badResponse = {
          message: "Data Not Found",
          error: err
        };
        return reject(badResponse);
      });
  });
};

exports.updateData = (toUpdate, data) => {
  return new Promise((resolve, reject) => {
    order
      .updateMany(toUpdate, data, { multi: true, new: true })
      .then(res => {
        console.log(res,"res")
        if (res.n&&res.nModified) {
          let response = {
            msg: "Data Updated"
          };
          return resolve(response);
        } else {
          let badResponse = {
            msg: "wrong information,not updated"
          };
          return reject(badResponse);
        }
      })
      .catch(err => {
        let badResponse = {
          msg: "Data Not Updated",
          error: err
        };
        return reject(badResponse);
      });
  });
};
