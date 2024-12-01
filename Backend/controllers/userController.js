const userModel = require("../models/userModel");
const { createUser } = require("../services/userService");
const { validationResult } = require("express-validator");

const userRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password } = req.body;
  const hashedPass = await userModel.hashPass(password);

  const user = await createUser({
    firstname: fullName.firstName,
    lastname: fullName.lastName,
    email,
    password: hashedPass,
  });

  const token = user.genAuthToken();

  res.status(201).json({ user, token });
};

const userLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatchPass = await user.comparePass(password);

  if (!isMatchPass) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.genAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

const userProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports = {
  userRegister,
  userLogin,
  userProfile,
};
