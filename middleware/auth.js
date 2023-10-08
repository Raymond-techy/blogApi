const jwt = require("jsonwebtoken");
const config = require("../startup/config");

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .send({ message: "Access denied. No token provided" });
  try {
    const decode = jwt.verify(token, config.JWT_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error.message, "auth middleware error");
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;
