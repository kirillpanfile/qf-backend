const mongoose = require("mongoose");

module.exports = function connect(URI) {
  mongoose
    .connect(URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};
