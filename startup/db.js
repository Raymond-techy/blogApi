const mongoose = require("mongoose");
const config = require("./config");
const logger = require("./logger");
module.exports = function () {
  mongoose
    .connect(config.MONGO_URL)
    .then(() => logger.info("Connected to database."));
};
