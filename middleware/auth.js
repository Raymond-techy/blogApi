const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .send({ message: "Access denied. No token provided" });
  try {
    const decode = jwt.verify(token, "Blog_jwtprivatekey");
    req.user = decode;
    next();
  } catch (error) {
    console.log(error.message, "auth middleware error");
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;
