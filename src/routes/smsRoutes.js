const express = require("express");
const twilioClient = require("../utils/functions/commonFunctions");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, number } = req.body;
    const from = "StnHQMhow";

    const messageFormatted = `Team-StnHQMhow: ${message}`;

    const status = await twilioClient({
      from: from,
      body: messageFormatted,
      to: `+91${number}`,
    });

    res
      .status(200)
      .json({ message: "Message sent successfully!", result: status });
  } catch (error) {
    res.status(400).json({ message: "failed to send message", error });
  }
});

module.exports = router;
