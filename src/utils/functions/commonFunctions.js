const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

const twilioClient = ({
  body = "",
  from = "+15174594914",
  to = "918602794816",
}) => {
  const client = new twilio(
    "ACeab880cafe21663fb9b9beecf325921a",
    "5132057e3c34b6bba20d5a30716f2c8b"
  );

  return client.messages.create({ body, from, to });
};

module.exports = twilioClient;
