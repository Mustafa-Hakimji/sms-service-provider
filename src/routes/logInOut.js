const express = require("express");
const StaffSchema = require("../models/staffModel");
const router = express.Router();

router.post("/in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await StaffSchema.findOne({ email });
    if (!staff) {
      return res.status(400).json({ message: "Staff not found" });
    }
    if (staff.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const updatedStaff = await StaffSchema.updateOne(
      { email },
      { token: true }
    );

    console.log(res);

    res.status(200).json({ message: "Login successful", staff: staff });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/out", async (req, res) => {
  try {
    const { email, password } = req.body;
    const staff = await StaffSchema.findOne({ email });
    if (!staff) {
      return res.status(400).json({ message: "Staff not found" });
    }
    if (staff.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const updatedStaff = await StaffSchema.updateOne(
      { email },
      { token: false }
    );
    res.status(200).json({ message: "Logout successful", staff: updatedStaff });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
