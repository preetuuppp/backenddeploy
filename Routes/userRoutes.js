const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const { userModel } = require("../model/usermodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//registering the users
userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.status(400).json({ msg: "error" });
      } else {
        const User = new userModel({ name, email, pass: hash }); //creating or sending the request
        await User.save();
        res.json({ msg: "Successfully registered", user: req.body });
      }
    });
  } catch (error) {
    res.json(error);
  }
});

//logging the users
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          let token = jwt.sign(
            { userID: user._id, user: user.name },
            process.env.secret
          );
          res.json({ msg: "Successfully logged in", token });
        } else {
          res.json({ error: "Failed to log in" });
        }
      });
    } else {
      res.json({ error: "user not found" });
    }
  } catch (error) {
    res.json(error);
  }
});

//logout the users
userRouter.patch("/update/:ID", async (req, res) => {});

module.exports = {
  userRouter,
};
