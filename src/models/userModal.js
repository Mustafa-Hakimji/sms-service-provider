const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  fName: String,
  lName: String,
  phone: String,
  address: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const UserSchema = mongoose.model("User", Schema);

module.exports = UserSchema;
