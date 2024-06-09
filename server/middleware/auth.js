const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const auth = async (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded.user;

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
