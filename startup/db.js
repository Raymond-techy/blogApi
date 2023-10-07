const mongoose = require("mongoose");
const config = require("./config");
module.exports = function () {
  mongoose
    .connect(config.MONGO_URL)
    .then(() => console.log("Connected to database..."))
    .catch((err) => console.log("Couldn't connect to database..."));
};
