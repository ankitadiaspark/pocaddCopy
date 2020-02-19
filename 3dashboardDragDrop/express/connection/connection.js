const mongoose = require('mongoose');


const uri = 'mongodb+srv://abcde:abcde@cluster0-7kzzj.mongodb.net/dragdrop?retryWrites=true&w=majority'

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,'useCreateIndex': true,'useUnifiedTopology': true
};

mongoose.connect(uri, options).then(
  () => {
    console.log("online mongo atlas database connected");
  },
  err => {
    console.log("Error", err)
  }
);


module.exports = mongoose;
