const UserModel = require("../models/user.model");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../utils/bcrypt");
const { JWT_SECRET } = require("../config/env");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "User registration successfull" });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name }, // payload
      JWT_SECRET, // secret
      { expiresIn: "7d" },
    );

    const resUser = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    return res.status(200).json({ message: "Logged In", user: resUser, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
