const User = require("../models/user.model");
const { newToken } = require("../utils/JwtUtils");
const bcrypt = require("bcrypt");

require("dotenv").config();

const register = async (req, res) => {
  // check if the email address provided already exist
  let user = await User.findOne({ email: req.body.email }).lean().exec();

  // if it already exists then throw an error
  if (user) {
    return res.status(400).json({
      status: "Failed",
      message: "User already exist. Please provide a different email",
    });
  }

  // hashing the password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  req.body.password = hashedPassword;

  // else we will create the user
  user = await User.create(req.body);

  // we will hash the password as plain text password is harmful
  // above point is done in user.controller

  // we will create the token
  const token = newToken(user);

  // return the user and the token
  res.status(201).send({ token, message: "User created successfully" });
};

const login = async (req, res) => {
  try {
    // check if the email address provided already exist
    let user = await User.findOne({ email: req.body.email });

    // if it does not exist then throw an error
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "email or password is wrong",
      });
    }

    // else we match the password
    // Check if the password is correct using bcrypt
    const passwordMatches = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // if not match then throw an error
    if (!passwordMatches) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    // if it matches then create the token
    const token = newToken(user);

    // return the user and the token
    res.status(201).json({ token, message: "Login succcessfully" });
  } catch (e) {
    return res.status(500).json({ status: "failed", message: e.message });
  }
  // res.status(201).send("Login");
};

const logout = async (req, res) => {
  try {
    return res.status(201).json({ message: "Logout succcessfully" });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = { register, login, logout, newToken };
