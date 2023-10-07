const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  MONGO_URL: process.env.MONGO_DB,
  JWT_KEY: process.env.JWT_PRIVATEKEY,
  port: process.env.PORT,
};
