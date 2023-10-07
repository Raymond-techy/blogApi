const winston = require("winston");
const config = require("./config");
require("winston-mongodb");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.MongoDB({
      level: "error",
      db: config.MONGO_URL,
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});

// 2QP4EEQTjun7qQtv

module.exports = logger;
