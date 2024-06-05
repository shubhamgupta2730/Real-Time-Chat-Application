const mongoose = require('mongoose');

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => {
      console.log("DB Connection Failed");
      console.error(error);
      process.exit(1);

    })
}

var a = 5;
var b = 6;
var c;
c=a+b;

module.exports = connect;
