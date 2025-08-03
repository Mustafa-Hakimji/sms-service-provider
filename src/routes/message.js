const express = require("express");
const MessageSchema = require("../models/messageModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const messages = await MessageSchema.find();
    if (!messages) {
      return res.status(404).json({ message: "Messages not found" });
    }

    res.status(200).json({ message: "Success", data: messages });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, message } = req.body;
    const isMessageExist = await MessageSchema.findOne({ title });

    if (isMessageExist) {
      return res
        .status(400)
        .json({ message: "Message title already exist", data: title });
    }
    const msg = await MessageSchema.create({ title, message });
    res.status(200).json({ message: "Message added successfully", data: msg });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
