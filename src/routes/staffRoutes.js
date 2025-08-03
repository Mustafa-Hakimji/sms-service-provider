const express = require("express");
const StaffSchema = require("../models/staffModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const staff = await StaffSchema.find();
    if (!staff) return res.status(404).send("No staffs found");

    res.status(200).json({ message: "Staffs found", users });
  } catch (error) {
    res.status(400).json({ message: "failed fetching staffs", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { fName, lName, phone, email, password } = req.body;
    const isStaffExist = await StaffSchema.findOne({ phone: `+91${phone}` });

    if (isStaffExist) {
      res
        .status(204)
        .json({ message: "Staff already exists", user: `${fName} ${lName}` });

      return;
    }

    if (!fName || !lName || !phone || !email || !password) {
      return res.status(400).send("Missing required fields");
    }

    const staff = await StaffSchema.create({
      ...req.body,
      phone: `${phone}`,
    });
    if (!staff) return res.status(400).send("Failed creating staff");

    res.status(201).json({ message: "staff created", staff });
  } catch (error) {
    res.status(400).json({ message: "failed creating staff", error });
  }
});

router.patch("/", async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;

    const staff = await StaffSchema.findOne({ email });

    if (!staff) {
      return res
        .status(401)
        .json({ message: "Staff does not exist please create one" });
    }

    if (staff.password !== password) {
      return res.status(401).json({ message: "Password entered is wrong" });
    }

    await StaffSchema.findOneAndUpdate(
      { email },
      { email, password: newPassword }
    );

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong", error });
  }
});

module.exports = router;
