const mongoose = require("mongoose");
const widgetGridSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  w: {
    type: Number,
    required: true
  },
  h: {
    type: Number,
    required: true
  },
  wSm: {
    type: Number,
    required: true
  },
  hSm: {
    type: Number,
    required: true
  },
  wMd: {
    type: Number,
    required: true
  },
  hMd: {
    type: Number,
    required: true
  },

  wLg: {
    type: Number,
    required: true
  },
  hLg: {
    type: Number,
    required: true
  },
  wXl: {
    type: Number,
    required: true
  },
  hXl: {
    type: Number,
    required: true
  },
  dragAndDrop: {
    type: Boolean,
    required: true
  },
  resizable: {
    type: Boolean,
    required: true
  },

  title: {
    type: String,
    required: true
  }
});

let widgetgrid = mongoose.model("widgetgrid", widgetGridSchema);
exports.findAll = (data) => {
  return new Promise((resolve, reject) => {
    widgetgrid.find(data)
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