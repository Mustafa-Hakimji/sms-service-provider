const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

const twilioClient = ({
  body = "",
  from = "+15174594914",
  to = "918602794816",
}) => {
  const client = new twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  return client.messages.create({ body, from, to });
};

module.exports = twilioClient;
