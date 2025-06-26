const express = require("express");
const twilioClient = require("../utils/functions/commonFunctions");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message, number } = req.body;

    const status = await twilioClient({ body: message, to: number });

    res
      .status(200)
      .json({ message: "Message sent successfully!", result: status });
  } catch (error) {
    res.status(400).json({ message: "failed to send message", error });
  }
});

module.exports = router;
