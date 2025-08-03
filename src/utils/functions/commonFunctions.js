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
    "7d963223900e02baa5e851bb0fe1789b"
  );

  return client.messages.create({ body, from, to });
};

module.exports = twilioClient;
