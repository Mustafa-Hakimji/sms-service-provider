const express = require("express");
const UserSchema = require("../models/userModal");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserSchema.find();
    if (!users) return res.status(404).send("No users found");

    res.status(200).json({ message: "Users found", users });
  } catch (error) {
    res.status(400).json({ message: "failed fetching users", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { mobile } = req.body;
    const isUserExist = await UserSchema.findOne({ mobile });

    if (isUserExist) {
      await UserSchema.findOneAndUpdate({ mobile }, { ...req.body }),
        { new: true };
      return res
        .status(200)
        .json({ message: "User updated successfully", user: isUserExist });
    }

    const user = await UserSchema.create({
      ...req.body,
    });

    if (!user) return res.status(400).send("Failed creating user");

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ message: "failed creating user", error });
  }
});

module.exports = router;
