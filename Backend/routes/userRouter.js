const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const UserModel = require("../models/userModel");
const { userRegister } = require("../controllers/userController");

router.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long"),
  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("First Name must be atleast 3 characters long"),
],
 userRegister
);

module.exports = router;
