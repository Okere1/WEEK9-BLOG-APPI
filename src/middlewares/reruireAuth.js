const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { JWT_SECRET } = require("../config/env");

const requreAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Acess denied, no token" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await UserModel.findById(payload.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Adding the logged in user info to a new property on the request object
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = requreAuth;
