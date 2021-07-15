const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const student = (req, res, next) => {
  if (req.user && req.user.isStudent) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a student");
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

const adminStudent = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.isStudent)) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin or student");
  }
};

exports.student = student;
exports.admin = admin;
exports.adminStudent = adminStudent;
exports.protect = protect;
