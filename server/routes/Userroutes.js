const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User =require("../modals/User")

const router = express.Router();
router.post("/signup", async (req, res) => {
    const { name,email, password } = req.body;
    try {
      const user = new User({ name,email, password });
      await user.save();
      res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;
  