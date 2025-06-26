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
    const { fName, lName, phone, address, email, password } = req.body;
    const isStaffExist = await StaffSchema.findOne({ phone: `+91${phone}` });

    if (isStaffExist) {
      res
        .status(204)
        .json({ message: "Staff already exists", user: `${fName} ${lName}` });

      return;
    }

    if (!fName || !lName || !phone || !address || !email || !password) {
      return res.status(400).send("Missing required fields");
    }

    const staff = await StaffSchema.create({
      ...req.body,
      phone: `+91${phone}`,
    });
    if (!staff) return res.status(400).send("Failed creating staff");

    res.status(201).json({ message: "staff created", staff });
  } catch (error) {
    res.status(400).json({ message: "failed creating staff", error });
  }
});

module.exports = router;
