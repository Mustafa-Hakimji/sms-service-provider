const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  title: String,
  message: String,
});

const MessageSchema = mongoose.model("Message", Schema);

module.exports = MessageSchema;
