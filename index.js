require("express-async-errors");
const express = require("express");
const app = express();
const config = require("./startup/config");

const blogs = require("./routers/blogpost");
const auth = require("./routers/auth");

const logger = require("./startup/logger");
const error = require("./middleware/error");

require("./startup/db")();
require("./startup/prod")(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/blogs", blogs);

app.use("/api/auth", auth);

app.use(error);

app.listen(config.port, () => console.log("App started on port 9000"));
