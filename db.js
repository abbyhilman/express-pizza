const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://Byhil:MVz6RTBfJt7LZce3@cluster0.q3mcu.mongodb.net/mern-pizza";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on("connected", () => {
  console.log(`Mongo DB Connection Successfull`);
});

db.on("error", () => {
  console.log(`Mongo DB Connection Failed`);
});

module.exports = mongoose;
