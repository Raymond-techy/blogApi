const bcrypt = require("bcrypt");
const { validateUser, User } = require("../models/users");
const Joi = require("joi");

const registerUser = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) return res.status(400).send("User already exist in the database");

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashed,
  });
  await newUser.save();

  const token = newUser.generateAuthToken();
  res.header("x-auth-token", token).send({ message: "success" });
};

const loginUser = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email/password");

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return res.status(400).send("Invalid email/password");
  const token = user.generateAuthToken();
  res.send(token);
};

const getUsers = async (req, res) => {
  const users = await User.find().sort("name").select("-_id -password -likes");
  res.send(users);
};

const validateLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(user);
};

module.exports = { loginUser, registerUser, getUsers };
