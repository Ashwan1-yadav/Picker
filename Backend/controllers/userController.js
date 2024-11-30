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
    firstname : fullName.firstName,
    lastname : fullName.lastName,
    email,
    password: hashedPass,
  });

  const token = user.genAuthToken();

  res.status(201).json({ user, token });
};

module.exports = {
  userRegister,
};
